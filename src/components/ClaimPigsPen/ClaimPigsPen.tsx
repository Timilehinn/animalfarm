/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useSpring, animated } from 'react-spring'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton' 
import { availablePigsToClaim } from 'api/getPigsBalance'
import styles from './ClaimPigsPen.module.scss'
import logo from '../../assets/svgg.png'
import { getBalanceAmountString, amountFormatter } from '../../utils/formatBalance'


interface claimProps {
	title: string
	pigsAvailableToClaim: string
	claimToPigPenAmount: string
	setClaimToPigPenAmount: any
	claimToPigPen: any
}

function ClaimPigsPen({ title, pigsAvailableToClaim, claimToPigPenAmount, setClaimToPigPenAmount, claimToPigPen }: claimProps) {
	const { account } = useActiveWeb3React()

	const styleProps = useSpring({ to: { opacity: 1, x: 0 }, from: { opacity: 0, x: -20 }, delay: 100 })

	const handleChange = (e: any) => {
		setClaimToPigPenAmount(e.target.value)
		// console.log(claimToPigPenAmount)
	}

	const handleClick = () => {
		claimToPigPen()
	}

	const buttonDisabled = Number(claimToPigPenAmount) === 0

	return (
		<animated.div style={styleProps} className={styles.claimpigs}>
			<h3>{title}</h3>
			<p className={styles.header}>Enter amount of pigs to be deposited to the pigs pen.</p>
			<form action=''>
				<div className={styles.inputWrap}>
					<p role="presentation" onClick={()=>setClaimToPigPenAmount(amountFormatter(getBalanceAmountString(pigsAvailableToClaim)))} className={styles.pigsauto} >Auto Fill PIGS</p>
					<div className={styles.inputBox}>
						<div className={styles.logo}>
							<img src={logo} alt='' />
							<p>PIGS</p>
						</div>
						<input value={claimToPigPenAmount} onChange={(e) => handleChange(e)} type='number' placeholder='0.0' />
					</div>
					{/* <div>
						<p className={styles.claimable}>Amount Claimable: {getBalanceAmountString(pigsAvailableToClaim)} PIGS</p>
					</div> */}
				</div>
				{/* Handle Connect Wallet */}
				{!account ? (
					<ConnectWalletButton />
				) : (
					<button onClick={() => handleClick()} disabled={buttonDisabled} className={buttonDisabled ? styles.button__disabled : styles.button__enabled} type='button'>
						Claim
					</button>
				)}
			</form>
		</animated.div>
	)
}

export default ClaimPigsPen
