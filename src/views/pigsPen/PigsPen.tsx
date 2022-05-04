import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { toggleTourModal } from 'state/toggle'
import ClaimPigsPen from 'components/ClaimPigsPen/ClaimPigsPen'
import RewardsCenter from 'components/RewardsCenter/RewardsCenter'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import { useAppDispatch } from 'state/hooks'
import styles from './PigsPen.module.scss'


import pig from '../../assets/svgg.png'

function PigsPen() {
	useEffect(() => {
		document.body.setAttribute(
			'style',
			`
		background-image: url(./bg/pigpen.png);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-color: rgb(24, 24, 24);`
		)
	}, [])
	const [activeTab, setActiveTab] = React.useState(1)
	const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 200 })
	const dispatch = useAppDispatch()

	

	// open tour modal
	useEffect(()=>{
		dispatch( toggleTourModal({state:false,msg:""}) )
		const data = {
			state : true,
			msg : "The PIGPEN is our staking protocol where holders of the PIGS token become owners of the platform by staking there PIGS. Pigpen pays out high yield dividends in both BUSD and PIGS that are generated from the platform fees and DOGs token taxes!!"
		}
		setTimeout(()=>{
			dispatch( toggleTourModal(data) )
				// setTimeout(()=>{
				// dispatch( toggleTourModal({state:false,msg:""}) )
			// },10000)
		},4000)

		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return (
		<div className={styles.pigspen__wrap}>
			<div className={styles.pigspen}>
				{/* <div className={styles.pigspen__header}>
					<p>
						THE PIGPEN IS OUR STAKING PROTOCOL WHERE HOLDERS OF THE PIGS TOKENS BECOME OWNERS OF THE PLATFORM! EARN HIGH YIELD DIVIDENDS IN PIGS AND BUSD. LEARN MORE:{' '}
						<a href={`${window.location.origin}/docs/Animal_Farm_Rebirth_-_Migration__White_Paper_002.pdf#%5B%7B%22num%22%3A29%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22FitH%22%7D%2C733.179%5D`} className={styles.header__a}>
							HERE{' '}
						</a>
					</p>
				</div> */}
				<div className={styles.cards}>
					<div>
						<PigsCreditCard title='Total PIGS Locked' amount='0.00 PIGS' />
					</div>
					<div>
						<PigsCreditCard title='Total Value Locked' amount='$0.00' />
					</div>
				</div>
				<div className={styles.credit__wrap}>
					<div className={styles.credit__wrap__in}>
						<div className={styles.tabs}>
							<div onClick={() => setActiveTab(1)} className={activeTab === 1 ? `${styles.tab__one} ${styles.tab__one__active}` : `${styles.tab__one}`}>
								<p>Deposit PIGS</p>
							</div>
							<div onClick={() => setActiveTab(2)} className={activeTab === 2 ? `${styles.tab__two} ${styles.tab__two__active}` : `${styles.tab__two}`}>
								<p>Withdraw PIGS</p>
							</div>
						</div>
						{activeTab === 1 ? (
							<RewardsCenter
								sliderRequired={false}
								title='Submit PIGS to be deposited'
								infoTitle='Earn'
								infoValue2='50 days'
								infoValue='BUSD'
								infoTitle2='Stake Lockup'
								infoTitle3='Total Liquidity'
								infoValue3='$0.00'
								icon={pig}
								pTitle='Enter amount of PIGS to be staked in the PIG Pen'
								token='PIGS'
								buttonText='Enter amount to deposit'
								Lock={false}
								rewardCenter
								warningMsg
							/>
						) : (
							<RewardsCenter
								sliderRequired={false}
								title='Withdraw your staked PIGS'
								infoValue2='2% per day'
								infoTitle='PIGS staked'
								infoValue='0 PIGS'
								infoTitle2='Withdraw limit'
								infoTitle3='Available PIGS to withdraw'
								infoValue3='0 PIGS'
								token='PIGS'
								hideAmountInput
								hideApproveButton
								icon={pig}
								Lock={false}
								buttonText='Withdraw PIGS'
								pTitle='Enter amount of PIGS to be withdrawn from the PIG Pen'
								rewardCenter={false}
								warningMsg={false}
							/>
						)}
					</div>
				</div>

				{/* absolute */}
				{/* <img className={styles.pig} src={pig} alt='' /> */}
			</div>
		</div>
	)
}

export default PigsPen
