/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'

// Components
import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton'
import Preloader from 'components/prealoder/preloader'

// State and hooks
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAppDispatch } from 'state/hooks'
import { usePricing } from 'state/pricing/hooks'
import useToast from 'hooks/useToast'
import { toggleModalBackDrop, toggleSwapModal } from 'state/toggle'

// APIs
import { fetchDataForSwap, approveSpendPIGS, swapCallback } from 'api/swap'
import { approveBusd } from 'api/allowance'

// Utils and helpers
import { getDecimalAmount, amountFormatter, getBalanceAmountString } from 'utils/formatBalance'

// Config
import { LARGE_NUMBER, PancakeSwapRouterv2Address } from 'config/constants'

// Styles and Images
import styles from './Swap.module.scss'
// import dog from '../../assets/dogg.png'
import busd from '../../assets/busd.png'
import swap from '../../assets/swap.png'
import arrow from '../../assets/arrow-down.png'
import pig from '../../assets/svgg.png'

function Swap() {
	const tokens = [
		{
			name: 'PIGS',
			icon: pig,
		},
		// {
		// 	name: 'DOGS',
		// 	icon: dog,
		// },
		{
			name: 'BUSD',
			icon: busd,
		},
	]

	const { account, library } = useActiveWeb3React()
	const signer = library.getSigner()

	const { pigsBusdPrice } = usePricing()
	const dispatch = useAppDispatch()
	const { toastInfo, toastSuccess, toastError } = useToast()

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isMenuOpen2, setIsMenuOpen2] = useState(false)
	const [activeToken, setActiveToken] = useState(1)
	const [activeToken2, setActiveToken2] = useState(0)
	const [inputOne, setInputOne] = useState('')
	const [inputTwo, setInputTwo] = useState('')
	// Approve States
	const [isApproved, setIsApproved] = useState(false)
	// Slippage
	const [tolerance, setTolerance] = React.useState('1')
	// Pending State
	const [pending, setPending] = useState(false)
	const [pendingApproval, setPendingApproval] = useState(false)
	// Main Button State
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)
	// Show Approve Button
	const [showApprove, setShowApprove] = useState(true)

	// Temp state (might change or not)
	const [userData, setUserData] = useState({
		allowance: {
			PIGS: '',
			BUSD: '',
		},
		balance: {
			PIGS: '0',
			BUSD: '0',
		},
	})

	useEffect(() => {
		if (account) {
			getDataForSwap()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account])

	// UseEffect for showing approve button
	useEffect(() => {
		// Allowance check
		if (!inputOne || (inputOne === '0' && isApproved)) {
			setShowApprove(false)
			return
		}
		if (new BigNumber(userData.balance[tokens[activeToken].name]).isLessThan(getDecimalAmount(inputOne))) {
			setShowApprove(false)
			return
		}
		if (new BigNumber(userData.allowance[tokens[activeToken].name]).isLessThan(getDecimalAmount(inputOne))) {
			setShowApprove(true)
			return
		}
		setShowApprove(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputOne, activeToken, userData, isApproved])

	useEffect(() => {
		if (new BigNumber(userData.balance[tokens[activeToken].name]).isLessThan(getDecimalAmount(inputOne))) {
			setIsButtonDisabled(true)
			return
		}
		if (inputOne > '0') {
			setIsButtonDisabled(false)
		} else {
			setIsButtonDisabled(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputOne, userData])

	// hook for price changes
	useEffect(() => {
		_setInput1(inputOne)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pigsBusdPrice])

	const setInput1 = (e: any) => {
		_setInput1(e.target.value)
	}
	const _setInput1 = (value) => {
		if (tokens[activeToken].name === 'PIGS' && tokens[activeToken2].name === 'BUSD') {
			setInputOne(value)
			setInputTwo(new BigNumber(pigsBusdPrice).multipliedBy(value).toString())
		}
		if (tokens[activeToken].name === 'BUSD' && tokens[activeToken2].name === 'PIGS') {
			setInputOne(value)
			setInputTwo(new BigNumber(value).dividedBy(pigsBusdPrice).toString())
		}
	}

	const setInput2 = (e: any) => {
		_setInput2(e.target.value)
	}
	const _setInput2 = (value) => {
		if (tokens[activeToken].name === 'PIGS' && tokens[activeToken2].name === 'BUSD') {
			setInputTwo(value)
			setInputOne(new BigNumber(value).dividedBy(pigsBusdPrice).toString())
		}
		if (tokens[activeToken].name === 'BUSD' && tokens[activeToken2].name === 'PIGS') {
			setInputTwo(value)
			setInputOne(new BigNumber(pigsBusdPrice).multipliedBy(value).toString())
		}
	}
	const resetInputs = () => {
		setInputOne('')
		setInputTwo('')
	}

	const handleChangeSlippage = (e: any) => {
		_setTolerance(e.target.value)
	}
	const _setTolerance = (val) => {
		if (Number(val) <= 100) {
			setTolerance(val)
		}
	}

	const openMenu = (id: number) => {
		if (id === 1) {
			setIsMenuOpen2(false)
			setIsMenuOpen(!isMenuOpen)
		} else {
			setIsMenuOpen(false)
			setIsMenuOpen2(!isMenuOpen2)
		}
	}

	const handleMenuClick = (index: number) => {
		if (index === activeToken2) {
			toastInfo(`you can't swap ${tokens[activeToken2].name} for ${tokens[index].name}`)
			return
		}
		setActiveToken(index)
		setIsMenuOpen(false)
	}
	const handleMenuClick2 = (index: number) => {
		if (index === activeToken) {
			toastInfo(`you can't swap ${tokens[activeToken].name} for ${tokens[index].name}`)
			return
		}
		setActiveToken2(index)
		setIsMenuOpen2(false)
	}
	const closeMenus = () => {
		setIsMenuOpen(false)
		setIsMenuOpen2(false)
	}
	const switchTokens = () => {
		const index1 = activeToken
		const index2 = activeToken2
		const value1 = inputOne
		const value2 = inputTwo
		setActiveToken(index2)
		setActiveToken2(index1)
		setInputOne(value2)
		setInputTwo(value1)
		closeMenus()
	}

	// API Calls
	const getDataForSwap = async () => {
		const data = await fetchDataForSwap(account)
		// Set data
		setUserData(data)
	}

	const handleApprove = async () => {
		if (!account) {
			toastInfo('Connect wallet to approve!')
			return
		}
		if (tokens[activeToken].name === 'PIGS') {
			handleApprovePIGS()
		}
		if (tokens[activeToken].name === 'BUSD') {
			handleApproveBUSD()
		}
	}
	const handleApprovePIGS = async () => {
		setPendingApproval(true)

		try {
			await approveSpendPIGS(signer)
			toastSuccess(`Approve PIGS Successful!`)
			getDataForSwap()
			setPendingApproval(false)
			setIsApproved(true)
		} catch (err) {
			console.error(err)
			toastError('Failed to approve PIGS. Try again!')
			setPendingApproval(false)
			setIsApproved(false)
		}
	}
	const handleApproveBUSD = async () => {
		setPendingApproval(true)

		try {
			await approveBusd(PancakeSwapRouterv2Address, LARGE_NUMBER, signer)
			toastSuccess(`Approve BUSD Successful!`)
			getDataForSwap()
			setPendingApproval(false)
			setIsApproved(true)
		} catch (err) {
			console.error(err)
			toastError('Failed to approve BUSD. Try again!')
			setPendingApproval(false)
			setIsApproved(false)
		}
	}

	const _swap = async () => {
		if (!account) {
			toastInfo('Connect wallet to add liquidity')
			return
		}
		try {
			setPending(true)
			const formattedInputOne = amountFormatter(inputOne, 18)
			const formattedInputTwo = amountFormatter(inputTwo, 18)

			const res = await swapCallback(tokens[activeToken].name, tokens[activeToken2].name, getDecimalAmount(formattedInputOne), getDecimalAmount(formattedInputTwo), tolerance, account, signer)

			if (res.success === true) {
				resetInputs()
				setPending(false)
				toastSuccess(res.message)
				getDataForSwap()
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
		isSwapModalOpen: true,
		swapingFrom: {
			tokenName: `${tokens[activeToken].name} `,
			amount: `${amountFormatter(inputOne, 7)}`,
		},
		swapingTo: {
			tokenName: `${tokens[activeToken2].name}`,
			amount: `${amountFormatter(inputTwo, 7)}`,
		},
		confirmFunction: _swap,
	}

	// open confirm modal
	const openModal = () => {
		dispatch(toggleModalBackDrop(true))
		dispatch(toggleSwapModal(modalProps))
	}

	return (
		<div className={styles.farm}>
			<header>Swap Tokens</header>
			<p className={styles.info}>Swap BUSD for PIGS utilizing our Pancakeswap liquidity pool.</p>
			<div className={styles.inputBox}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div onClick={() => openMenu(1)} className={styles.logo}>
						<img src={tokens[activeToken].icon} alt='' />
						<p>{tokens[activeToken].name}</p>
						<img id={styles.dropdown} src={arrow} alt='' />
					</div>
					<input min='0' required type='number' value={amountFormatter(inputOne, 7)} onChange={(e) => setInput1(e)} placeholder='0.0' />
				</div>
				<div className={styles.balance}>
					<p>Balance: {amountFormatter(getBalanceAmountString(userData.balance[tokens[activeToken].name]), 9)}</p>
					<p
						onClick={() => {
							_setInput1(amountFormatter(getBalanceAmountString(userData.balance[tokens[activeToken].name])))
						}}
						role='presentation'
						className={styles.autoFillBusd}
					>
						Max
					</p>
				</div>
				{isMenuOpen && (
					<div className={styles.box}>
						{tokens.map((item, index) => (
							<div key={index} onClick={() => handleMenuClick(index)} className={styles.box__item}>
								<img src={item.icon} alt='' />
								<p style={{ color: 'white' }}> {item.name}</p>
							</div>
						))}
					</div>
				)}
			</div>
			<div className={styles.swapIcon}>
				<img src={swap} alt='' onClick={switchTokens} />
			</div>

			<div className={styles.inputBox}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div onClick={() => openMenu(2)} className={styles.logo}>
						<img src={tokens[activeToken2].icon} alt='' />
						<p>{tokens[activeToken2].name}</p>
						<img id={styles.dropdown} src={arrow} alt='' />
					</div>
					<input min='0' required type='number' value={amountFormatter(inputTwo, 7)} onChange={(e) => setInput2(e)} placeholder='0.0' />
				</div>
				<div className={styles.balance}>
					<p>Balance: {amountFormatter(getBalanceAmountString(userData.balance[tokens[activeToken2].name]), 9)}</p>
				</div>
				{isMenuOpen2 && (
					<div className={styles.box}>
						{tokens.map((item, index) => (
							<div key={index} onClick={() => handleMenuClick2(index)} className={styles.box__item}>
								<img src={item.icon} alt='' />
								<p style={{ color: 'white' }}> {item.name}</p>
							</div>
						))}
					</div>
				)}
			</div>
			{/* Approval Button */}
			{showApprove &&
				account &&
				(pendingApproval ? (
					<button type='button' className={styles.button__enabled}>
						<Preloader />
					</button>
				) : (
					<button onClick={handleApprove} type='button' className={styles.button__enabled}>
						Approve {tokens[activeToken].name}
					</button>
				))}
			{/* Swap Button */}
			{account &&
				(isButtonDisabled ? (
					<button type='button' className={styles.button__disabled}>
						{new BigNumber(userData.balance[tokens[activeToken].name]).isLessThan(getDecimalAmount(inputOne)) ? `Insufficient ${tokens[activeToken].name} Balance` : 'Enter amount'}
					</button>
				) : pending ? (
					<button type='button' className={styles.button__enabled}>
						<Preloader />
					</button>
				) : (
					<button disabled={showApprove} onClick={openModal} type='button' className={showApprove ? styles.button__disabled : styles.button__enabled}>
						Swap
					</button>
				))}
			{/* Connect Wallet Button */}
			{!account && <ConnectWalletButton />}
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
		</div>
	)
}

export default Swap
