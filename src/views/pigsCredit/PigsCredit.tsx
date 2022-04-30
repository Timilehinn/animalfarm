import React,{ useEffect,useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { getBUSDPrice } from 'api/getPrice'
import { getBNBPrice } from 'utils/getPrice'
import ClaimPigsPen from 'components/ClaimPigsPen/ClaimPigsPen'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import RewardsCenter from 'components/RewardsCenter/RewardsCenter'
import { useAppSelector } from '../../state/hooks'
import styles from './PigsCredit.module.scss'
import pig from '../../assets/pig.png'

function PigsCredit() {

	useEffect(()=>{
		getBusdPrice()
	},[])

	const [ pigsBusdPrice, setPigsBusdPrice ] = useState(0)

	const [activeTab, setActiveTab] = React.useState(1)
	const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 200 })
	const pigsBalance = useAppSelector((state)=>state.balanceReducer.pigsBalance)

	const getBusdPrice = async() => {

		try{
			const res = await getBUSDPrice();
			console.log(res,"busd")
			setPigsBusdPrice(res)
		}catch(err){
			console.log(err)
		}
		
	}

	return (
		<animated.div style={props} className={styles.pigscredit__wrap}>
			<div className={styles.pigscredit}>
				<div className={styles.cards}>
					<div>
						<PigsCreditCard amount={pigsBalance} />
					</div>
					<div>
						<PigsCreditCard  />
					</div>
				</div>
				<div className={styles.credit__wrap}>
					<div className={styles.tabs}>
						<div onClick={() => setActiveTab(1)} className={activeTab === 1 ? `${styles.tab__one} ${styles.tab__one__active}` : `${styles.tab__one}`}>
							<p>Claim to pig pens</p>
						</div>
						<div onClick={() => setActiveTab(2)} className={activeTab === 2 ? `${styles.tab__two} ${styles.tab__two__active}` : `${styles.tab__two}`}>
							<p>Claim to Piggy bank</p>
						</div>
					</div>
					{activeTab === 1 ? <ClaimPigsPen title='Submit Pigs' /> : <RewardsCenter pigsBusdPrice={pigsBusdPrice} Lock pair  sliderRequired title='Submit PIGS/BUSD LP' />}
				</div>

				<img className={styles.pig} src={pig} alt='' />
			</div>
		</animated.div>
	
	)
} 

export default PigsCredit
