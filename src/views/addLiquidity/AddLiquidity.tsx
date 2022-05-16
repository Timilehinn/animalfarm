import Info from 'components/Info/Info'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import styles from './AddLiquidity.module.scss'
import pigs from '../../assets/svgg.png'
import busd from '../../assets/busd.png'


function AddLiquidity() {
	const pigsBusdLPBalance = useAppSelector((state) => state.balanceReducer.pigsBusdLpBalance)
	// const pigsBalance = useAppSelector((state) => state.balanceReducer.pigsBalance.amountString)
	// const busdBalance = useAppSelector((state) => state.balanceReducer.busdBalance)

	const busdBalance = '2'
	const pigsBalance = '2'

	const [pigsValue, setPigsValue] = useState(0)
	const [busdValue, setBusdValue] = useState(0)

	const [isButtonDisabled, setIsButtonDisabled] = useState(true)

	useEffect(() => {
		if (parseInt(busdBalance) === 0 && parseInt(pigsBalance) === 0) {
			setIsButtonDisabled(true)
			return
		}
		if (pigsValue > 0) {
			setIsButtonDisabled(false)
		} else {
			setIsButtonDisabled(true)
		}
	}, [pigsValue])

	const setInput = (e: any) => {
		setPigsValue(e.target.value)
		console.log(e.target.value)
		// if( Number(pigsBalance) === 0 && Number(busdBalance) === 0  ){
		//     setIsButtonDisabled(true)
		// }
		// if( Number(pigsValue) !== 0  ){
		//     setIsButtonDisabled(true)
		//     return
		// }
		// setIsButtonDisabled(false)
	}

	return (
		<div className={styles.addliquidity__wrap}>
			<div className={styles.addliquidity}>
				<section>
					<header>Get PIGS/BUSD LP Tokens</header>
					<p className={styles.info}>Enter the amount of BUSD to be paired with PIG</p>
					<div className={styles.info__area}>
						<Info title='Your PIGS/BUSD LP balance' info={`${pigsBusdLPBalance}  PIGS/BUSD`} />
						<Info title='Your PIGS balance' info={`${pigsBalance} PIGS`} />
						<Info title='Your BUSD balance' info={`${busdBalance} BUSD`} />
					</div>
					{/* input 1 */}
					<div className={styles.inputBox}>
						<p role='presentation' className={styles.autoFillBusd}>
							Auto Fill PIGS
						</p>

						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div className={styles.logo}>
								<img src={pigs} alt='' />
								<p>PIG</p>
							</div>
							<input onChange={(e) => setInput(e)} value={pigsValue} min='0' required type='number' placeholder='0.0' />
						</div>
					</div>
					{/* input 2 */}
					<div className={styles.inputBox}>
						<p role='presentation' className={styles.autoFillBusd}>
							Auto Fill BUSD
						</p>

						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div className={styles.logo}>
								<img src={busd} alt='' />
								<p>BUSD</p>
							</div>
							<input onChange={(e:any) => setBusdValue(e.target.value)} value={busdValue} min='0' required type='number' placeholder='0.0' />
						</div>
					</div>
					<p className={styles.xpigs}>
						<span>20 PIGS</span> will be paired with <span>50 BUSD</span>
					</p>
					{isButtonDisabled ? (
						<button type='button' className={styles.button__disabled}>
							{parseInt(pigsBalance) === 0 ? 'Insufficient fund' : 'Enter amount'}
							{/* // { (Number(pigsBalance) === 0 && Number(busdBalance) === 0) ? "Insufficient fund" : "Enter amount" } */}
						</button>
					) : (
						<button type='button' className={styles.button__enabled}>
							Confirm
						</button>
					)}
				</section>
			</div>
		</div>
	)
}

export default AddLiquidity
