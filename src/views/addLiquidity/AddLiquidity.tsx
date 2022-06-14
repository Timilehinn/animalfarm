import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'

// Components
import Info from 'components/Info/Info'
import Preloader from 'components/prealoder/preloader'

// State and hooks
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAppDispatch } from 'state/hooks'
import { usePricing } from 'state/pricing/hooks'
import useToast from 'hooks/useToast'
import { setModalProps, toggleModalBackDrop, toggleConfirmModal } from 'state/toggle'

// APIs
import { fetchDataForAddLiquidity, approveSpendPIGS, addPIGSAndBUSDToLiquidity } from 'api/addLiquidity'
import { approveBusd } from 'api/allowance'

// Utils and helpers
import { getDecimalAmount, amountFormatter, getBalanceAmountString } from 'utils/formatBalance'

// Config
import { LARGE_NUMBER, LiquidityHelperPigsV2Address } from 'config/constants'

import styles from './AddLiquidity.module.scss'
import pigs from '../../assets/svgg.png'
import busd from '../../assets/busd.png'

function AddLiquidity() {
	useEffect(() => {
		document.body.setAttribute(
			'style',
			`
		background-image: url(${window.location.origin}/bg/piggybank.png);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-color: rgb(24, 24, 24);`
		)
	}, [])

	const { account, library } = useActiveWeb3React()
	const signer = library.getSigner()

	const { pigsBusdPrice } = usePricing()
	const dispatch = useAppDispatch()

	const { toastInfo, toastSuccess, toastError } = useToast()

	// PIGS and BUSD allowances
	const [pigsAllowance, setPIGSAllowance] = useState('')
	const [busdAllowance, setBUSDAllowance] = useState('')
	// PIGS and BUSD balances
	const [pigsBalance, setPIGSBalance] = useState('0')
	const [busdBalance, setBUSDBalance] = useState('0')
	const [pigsBusdLPBalance, setPigsBusdLPBalance] = useState('0')
	// Input Values
	const [pigsValue, setPigsValue] = useState('')
	const [busdValue, setBusdValue] = useState('')
	// Slippage
	const [tolerance, setTolerance] = React.useState('10')
	// Main Button State
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)
	// Approve States
	const [isPIGSApproved, setIsPIGSApproved] = useState(false)
	const [isBUSDApproved, setIsBUSDApproved] = useState(false)
	// Pending State
	const [pending, setPending] = useState(false)
	const [pendingPigs, setPendingPigs] = useState(false)
	const [pendingBusd, setPendingBusd] = useState(false)
	// Show Approve Button
	const [showPIGSApprove, setShowPIGSApprove] = useState(true)
	const [showBUSDApprove, setShowBUSDApprove] = useState(true)

	// UseEffect for showing approve buttons
	useEffect(() => {
		// PIGS Allowance check
		allowanceCheckHelper(setShowPIGSApprove, pigsValue, pigsAllowance, isPIGSApproved)
		// BUSD Allowance check
		allowanceCheckHelper(setShowBUSDApprove, busdValue, busdAllowance, isBUSDApproved)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pigsValue, busdValue, pigsAllowance, busdAllowance, isPIGSApproved, isBUSDApproved])

	// Use Effect for Add Liquidity button
	useEffect(() => {
		if (new BigNumber(busdBalance).isEqualTo(0) && new BigNumber(pigsBalance).isEqualTo(0)) {
			setIsButtonDisabled(true)
			return
		}
		if (pigsValue > '0' && busdValue > '0') {
			setIsButtonDisabled(false)
		} else {
			setIsButtonDisabled(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pigsValue, busdValue])

	const setInput = (e: any) => {
		_setInput(e.target.value)
	}
	const _setInput = (value) => {
		setPigsValue(value)
		setBusdValue(new BigNumber(pigsBusdPrice).multipliedBy(value).toString())
	}

	const setInput2 = (e: any) => {
		_setInput2(e.target.value)
	}
	const _setInput2 = (value) => {
		setBusdValue(value)
		setPigsValue(new BigNumber(value).dividedBy(pigsBusdPrice).toString())
	}

	useEffect(() => {
		if (account) {
			getDataForAddLiquidity()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account])

	const resetInputs = () => {
		setInput('')
		setInput2('')
	}

	const getDataForAddLiquidity = async () => {
		const data = await fetchDataForAddLiquidity(account)
		// Set data
		setPIGSAllowance(data.pigsAllowance)
		setBUSDAllowance(data.busdAllowance)
		setPIGSBalance(data.pigsBalance)
		setBUSDBalance(data.busdBalance)
		setPigsBusdLPBalance(data.pigsBusdLPBalance)
	}

	const allowanceCheckHelper = (setter: (value: boolean) => void, inputValue, allowance, isApproved) => {
		if (!inputValue || (inputValue === '0' && isApproved)) {
			setter(false)
			return
		}
		if (new BigNumber(allowance).isLessThan(getDecimalAmount(inputValue))) {
			setter(true)
			return
		}
		setter(false)
	}

	const handleApprovePIGS = async () => {
		if (!account) {
			toastInfo('Connect wallet to approve!')
			return
		}
		setPendingPigs(true)

		try {
			await approveSpendPIGS(signer)
			toastSuccess(`Approve PIGS Successful!`)
			getDataForAddLiquidity()
			setPendingPigs(false)
			setIsPIGSApproved(true)
		} catch (err) {
			console.error(err)
			toastError('Failed to approve PIGS. Try again!')
			setPendingPigs(false)
			setIsPIGSApproved(false)
		}
	}

	const handleApproveBUSD = async () => {
		if (!account) {
			toastInfo('Connect wallet to approve!')
			return
		}
		setPendingBusd(true)

		try {
			await approveBusd(LiquidityHelperPigsV2Address, LARGE_NUMBER, signer)
			toastSuccess(`Approve BUSD Successful!`)
			getDataForAddLiquidity()
			setPendingBusd(false)
			setIsBUSDApproved(true)
		} catch (err) {
			console.error(err)
			toastError('Failed to approve BUSD. Try again!')
			setPendingBusd(false)
			setIsBUSDApproved(false)
		}
	}

	const addLiquidityPigsBusd = async () => {
		if (!account) {
			toastInfo('Connect wallet to add liquidity')
			return
		}
		try {
			setPending(true)
			const formattedPigs = amountFormatter(pigsValue, 18)
			const formattedBusd = amountFormatter(busdValue, 18)

			const res = await addPIGSAndBUSDToLiquidity(getDecimalAmount(formattedPigs), getDecimalAmount(formattedBusd), tolerance, signer)

			dispatch(toggleConfirmModal(false))
			dispatch(toggleModalBackDrop(false))

			if (res.success === true) {
				resetInputs()
				setPending(false)
				toastSuccess(res.message)
				getDataForAddLiquidity()
			}

			if (res.success === false) {
				setPending(false)
				toastError(res.message)
			}
		} catch (err) {
			console.error(err)
			setPending(false)
		}
	}

	// confirm modal props
	const modalProps = {
		modalTitleText: 'Add Liquidity',
		confirmButtonText: 'Add Liquidity',
		value: '',
		text: 'PIGS / BUSD',
		warning: '*Estimated values.',
		infoValues: [
			{ title: 'PIGS deposited', value: `${pigsValue}` },
			{ title: 'BUSD deposited', value: `${busdValue}` },
		],
		confirmFunction: addLiquidityPigsBusd,
	}

	// open confirm modal
	const openModal = () => {
		dispatch(toggleModalBackDrop(true))
		dispatch(toggleConfirmModal(true))
		dispatch(setModalProps(modalProps))
	}

	const handleChangeSlippage = (e: any) => {
		_setTolerance(e.target.value)
	}

	const _setTolerance = (val) => {
		if (Number(val) <= 100) {
			setTolerance(val)
		}
	}

	return (
		<div className={styles.addliquidity__wrap}>
			<div className={styles.addliquidity}>
				<section>
					<header>Get PIGS/BUSD LP Tokens</header>
					<p className={styles.info}>Enter the amount of BUSD to be paired with PIG</p>
					<div className={styles.info__area}>
						<Info title='Your PIGS/BUSD LP balance' info={`${amountFormatter(getBalanceAmountString(pigsBusdLPBalance), 9)}  PIGS/BUSD`} />
						<Info title='Your PIGS balance' info={`${amountFormatter(getBalanceAmountString(pigsBalance), 9)} PIGS`} />
						<Info title='Your BUSD balance' info={`${amountFormatter(getBalanceAmountString(busdBalance), 9)} BUSD`} />
					</div>
					{/* input 1 */}
					<div className={styles.inputBox}>
						<p
							onClick={() => {
								_setInput(amountFormatter(getBalanceAmountString(pigsBalance), 9))
							}}
							role='presentation'
							className={styles.autoFillBusd}
						>
							Auto Fill PIGS
						</p>

						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div className={styles.logo}>
								<img src={pigs} alt='' />
								<p>PIG</p>
							</div>
							<input onChange={(e) => setInput(e)} value={amountFormatter(pigsValue, 7)} min='0' required type='number' placeholder='0.0' />
						</div>
					</div>
					{/* input 2 */}
					<div className={styles.inputBox}>
						<p
							onClick={() => {
								_setInput2(amountFormatter(getBalanceAmountString(busdBalance), 9))
							}}
							role='presentation'
							className={styles.autoFillBusd}
						>
							Auto Fill BUSD
						</p>

						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div className={styles.logo}>
								<img src={busd} alt='' />
								<p>BUSD</p>
							</div>
							<input onChange={(e: any) => setInput2(e)} value={amountFormatter(busdValue, 7)} min='0' required type='number' placeholder='0.0' />
						</div>
					</div>
					<p className={styles.xpigs}>
						<span>{amountFormatter(pigsValue, 7)} PIGS</span> will be paired with <span>{amountFormatter(busdValue, 7)} BUSD</span>
					</p>
					{showPIGSApprove &&
						(pendingPigs ? (
							<button type='button' className={styles.button__enabled}>
								<Preloader />
							</button>
						) : (
							<button onClick={handleApprovePIGS} type='button' className={styles.button__enabled}>
								Approve PIGS
							</button>
						))}
					{showBUSDApprove &&
						(pendingBusd ? (
							<button type='button' className={styles.button__enabled}>
								<Preloader />
							</button>
						) : (
							<button onClick={handleApproveBUSD} type='button' className={styles.button__enabled}>
								Approve BUSD
							</button>
						))}
					{isButtonDisabled ? (
						<button type='button' className={styles.button__disabled}>
							{new BigNumber(busdBalance).isEqualTo(0) && new BigNumber(pigsBalance).isEqualTo(0) ? 'Insufficient Balance' : 'Enter amount'}
						</button>
					) : pending ? (
						<button type='button' className={styles.button__enabled}>
							<Preloader />
						</button>
					) : (
						<button onClick={openModal} type='button' className={styles.button__enabled}>
							Add Liquidity
						</button>
					)}
					{/* Slippage */}
					<div className={styles.slippage}>
						<p>Slippage settings</p>
						<div className={styles.slippage__buttons}>
							<button className={Number(tolerance) === 1 ? `${styles.active}` : ''} type='button' onClick={() => _setTolerance(1)}>
								1%
							</button>
							<button className={Number(tolerance) === 5 ? `${styles.active}` : ''} type='button' onClick={() => _setTolerance(5)}>
								5%
							</button>
							<button className={Number(tolerance) === 10 ? `${styles.active}` : ''} type='button' onClick={() => _setTolerance(10)}>
								10%
							</button>
							<input
								className={Number(tolerance) !== 1 && Number(tolerance) !== 5 && Number(tolerance) !== 10 ? `${styles.active}` : ''}
								onChange={(e) => handleChangeSlippage(e)}
								min='0'
								max='100'
								required
								value={tolerance}
								type='number'
								placeholder='0.0'
							/>
						</div>
						<div className={styles.tolerance}>
							<p>Slippage tolerance</p>
							<p className={styles.price}>{tolerance}%</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default AddLiquidity
