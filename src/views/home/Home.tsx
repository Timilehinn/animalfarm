import React, { useEffect } from 'react'
import Carousel from 'components/Carousel/Carousel'
import Carousel2 from 'components/Carousel2/Carousel2'
import { getPigsBalance, availablePigsToClaim, getBusdBalance, getPigsBusdLpBalance } from '../../api/getPigsBalance'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import styles from './Home.module.scss'
import chart from '../../assets/chart.png'
import { setPigsBalance, setBusdBalance, setPigsBusdLpBalance } from '../../state/balances'
import { setPigsAvailableToClaim } from '../../state/pigs'
import { useAppDispatch } from '../../state/hooks'

function Home() {
	const { account } = useActiveWeb3React()
	const dispatch = useAppDispatch()
	// console.log(account)

	useEffect(() => {
		document.body.setAttribute(
			'style',
			`
		background-image: url(./bg/home.png);
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		background-color: rgb(24, 24, 24);`
		)
	}, [])

	const _getPigsBalance = async () => {
		const res = await getPigsBalance(account)
		console.log(res)
		dispatch(setPigsBalance(res))
	}

	const _getBusdBalance = async () => {
		const res = await getBusdBalance(account)
		console.log(res)
		dispatch(setBusdBalance((res.amount / 10 ** 18).toString()))
	}

	const getPigsToClaim = async () => {
		const res = await availablePigsToClaim(account)
		console.log(Number(res.amount) / 10 ** 18)
		dispatch(setPigsAvailableToClaim(Number(res.amount) / 10 ** 18))
	}

	const _getPigsBusdLpBalance = async () => {
		const res = await getPigsBusdLpBalance(account)
		console.log(res, 'pigsBusdLpBalance')
		dispatch(setPigsBusdLpBalance((Number(res.amount) / 10 ** 18).toString()))
	}

	useEffect(() => {
		if (account) {
			Promise.all([getPigsToClaim(), _getPigsBalance(), _getBusdBalance(), _getPigsBusdLpBalance()])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account])

	return (
		<div className={styles.home__wrap}>
			<div className={styles.home}>
				<section className={styles.home__farm}>
					<div className={styles.home__farm__one}>
						<h3>The Animal Farm</h3>
						<p>
							The Animal Farm is the first deflationary, fully decentralized ownership yieldfarm/lending protocol where participants earn as an owner of the network. The super wealthy do not build and protect their wealth through
							selling their assets. They accumulate and then leverage their assets, while living off the dividends. The Animal Farm captures this financial power and puts it in the hands of the platforms participants.
						</p>
					</div>
					<div className={styles.home__farm__two}>
						<img src={chart} alt='' />
					</div>
				</section>
				{/* <Carousel /> */}
				<Carousel2 />
			</div>
		</div>
	)
}

export default Home
