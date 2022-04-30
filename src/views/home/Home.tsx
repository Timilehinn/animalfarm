import React, { useEffect } from 'react'
import Carousel from 'components/Carousel/Carousel'
import { getPigsBalance,availablePigsToClaim } from '../../api/getPigsBalance'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import styles from './Home.module.scss'
import chart from '../../assets/chart.png'
import { setPigsBalance  } from '../../state/balances'
import { setPigsAvailableToClaim } from '../../state/pigsCredit'
import { useAppDispatch } from '../../state/hooks'

function Home() {
	const { account } = useActiveWeb3React()
	const dispatch = useAppDispatch()
	console.log(account)

	const getBalance = async () => {
		const res = await getPigsBalance(account)
		console.log(res)
		dispatch(setPigsBalance(Number(res.amount/10**18)))
	}

	const getPigsToClaim = async () => {
		const res = await availablePigsToClaim(account);
		console.log( Number(res.amount)/10**18 )
		dispatch(setPigsAvailableToClaim(Number(res.amount)/10**18))
	}
	

	useEffect(() => {
		if (account) {
			getPigsToClaim()
			getBalance()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account])

	return (
		<div className={styles.home__wrap} >
			<div className={styles.home}>
				<section className={styles.home__farm}>
					<div className={styles.home__farm__one}>
						<h3>The Farm</h3>
						<p>
							The Animal Farm is the first deflationary, fully decentralized ownership yieldfarm/lending protocol where participants earn as an owner of the network. The super wealthy do not build and protect their wealth through selling
							their assets. They accumulate and then leverage their assets, while living off the dividends. The Animal Farm captures this financial power and puts it in the hands of the platforms participants.
						</p>
					</div>
					<div className={styles.home__farm__two}>
						<img src={chart} alt='' />
					</div>
				</section>
				<Carousel />
			</div>
		</div>
		
	)
}

export default Home
