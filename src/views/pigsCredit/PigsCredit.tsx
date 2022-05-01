import React,{ useEffect,useState,useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import { getBUSDPrice } from 'api/getPrice'

import { ClaimToPiggyBank } from 'api/claimPigs'

import { toggleToastNotification,toggleModalBackDrop,toggleConfirmModal } from 'state/toggle'
import { getBNBPrice } from 'utils/getPrice'
import ClaimPigsPen from 'components/ClaimPigsPen/ClaimPigsPen'
import PigsCreditCard from 'components/PigsCreditCard/PigsCreditCard'
import RewardsCenter from 'components/RewardsCenter/RewardsCenter'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { checkAllowance, approveBusd } from '../../api/allowance'
import { useAppSelector,useAppDispatch } from '../../state/hooks'
import styles from './PigsCredit.module.scss'
import pig from '../../assets/pig.png'

function PigsCredit() {

	const { account,library } = useActiveWeb3React()
	const signer = library.getSigner()

	useEffect(()=>{
		Promise.all([getBusdPrice(),getAllowance()])
	},[])

	

	const dispatch = useAppDispatch()
	const [ pigsBusdPrice, setPigsBusdPrice ] = useState(0)
	const [allowance, setAllowance] = useState(null)
	const [ busdValue, setBusdValue] = useState(0)
	const [canApprove, setCanApprove] = useState(false)
	const [pending, setPending] = useState(false)
	const [ isApproved, setIsApproved ] = useState(false)
	const [ lockDuration, setLockDuration  ] = useState(0)
	

	const [activeTab, setActiveTab] = React.useState(1)
	const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 200 })
	const pigsBalance = useAppSelector((state)=>state.balanceReducer.pigsBalance)


	// useEffect(()=>{
	// 	if(allowance < busdValue){
	// 		setCanApprove(true)
	// 	}else{
	// 		setCanApprove(false)
	// 	}
	// },[busdValue])
	

	const getBusdPrice = async() => {

		try{
			const res = await getBUSDPrice();
			console.log(res,"busd")
			setPigsBusdPrice(res)

		}catch(err){

			console.log(err)
		}
		
	}

	const getAllowance = async() => {

		try{
			const res = await checkAllowance(account,"0xb5c4569617320146c8510A9Cf432dd2f86acf6d1");
			console.log(res,"allowance")
			setAllowance( res.allowance )

		}catch(err){
			console.log(err)
		}
	}

	const approve = async() =>{
		setPending(true)
		try{
			console.log(busdValue,"tesss")
			const res = await approveBusd("0xb5c4569617320146c8510A9Cf432dd2f86acf6d1",(busdValue * 10**18).toString(), signer)
			setPending(false)
			setIsApproved(true)
			const data = {
				success : true,
				msg : "approved"
			}
			console.log(data)
		}catch(err){
			console.log(err)
			const data = {
				success : false,
				msg : "not approved"
			}
			setPending(false)
			setIsApproved(false)
		}
	}

	const claimToPiggy = async() =>{
		try{
			const res = await ClaimToPiggyBank(((busdValue / pigsBusdPrice) * 10**18).toString(), (busdValue * 10**18).toString(), lockDuration,signer)
			console.log(res)

			dispatch( toggleToastNotification({state:true,msg:"Success"}) );
			dispatch( toggleConfirmModal(false) );
			dispatch( toggleModalBackDrop(false) );

			setTimeout(()=>{
				dispatch( toggleToastNotification(false) );
			},3000)
		}catch(err){
			console.log(err)
		}
	}

	

	const isButtonEnabled = Boolean(allowance < (busdValue * 10**18 ).toString() && busdValue !== null && lockDuration > 0)
	console.log(allowance, (busdValue * 10**18 ).toString() )
	

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
					{activeTab === 1 ? 
					<ClaimPigsPen title='Submit Pigs' /> : 
					<RewardsCenter 
						pigsBusdPrice={pigsBusdPrice} 
						Lock 
						pair 
						text="PIGS/BUSD LP Tokens" 
						allowance={allowance}  
						sliderRequired 
						title='Submit PIGS/BUSD LP'
						busdValue={busdValue} 
						setBusdValue={setBusdValue}
						isButtonEnabled={isButtonEnabled}
						approve = {approve}
						pending={pending}
						isApproved={isApproved}
						lockDuration={lockDuration}
						setLockDuration={setLockDuration}
						_confirmFunction={claimToPiggy}
						
					/>}
				</div>

				<img className={styles.pig} src={pig} alt='' />
			</div>
		</animated.div>
	
	)
} 

export default PigsCredit
