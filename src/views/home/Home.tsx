import React, { useEffect } from 'react'
import Carousel from 'components/Carousel/Carousel'
import { getPigsBUSDPrice } from 'utils/getPrice'
import { usePricing } from 'state/pricing/hooks'
import { getPigsBalance, getBusdBalance, getPigsBusdLpBalance } from '../../api/getPigsBalance'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import styles from './Home.module.scss'
import chart from '../../assets/chart.png'
import { setPigsBalance, setBusdBalance, setPigsBusdLpBalance } from '../../state/balances'
import { useAppDispatch } from '../../state/hooks'

function Home() {
	const { account } = useActiveWeb3React()
	const dispatch = useAppDispatch()
	const { setPigsBusdPrice } = usePricing()

	useEffect(() => {
		document.body.setAttribute(
			'style',
			`
		background-image: url(${window.location.origin}/bg/home.png);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-color: rgb(24, 24, 24);`
		)
	}, [])

	const getBusdPrice = async () => {
		try {
			const res = await getPigsBUSDPrice()
			dispatch(setPigsBusdPrice(res))
		} catch (err) {
			console.log(err)
		}
	}

	const _getPigsBalance = async () => {
		const res = await getPigsBalance(account)
		dispatch(setPigsBalance(res))
	}

	const _getBusdBalance = async () => {
		const res = await getBusdBalance(account)
		dispatch(setBusdBalance((res.amount / 10 ** 18).toString()))
	}

	const _getPigsBusdLpBalance = async () => {
		const res = await getPigsBusdLpBalance(account)
		dispatch(setPigsBusdLpBalance((Number(res.amount) / 10 ** 18).toString()))
	}

	useEffect(() => {
		getBusdPrice()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (account) {
			Promise.all([getBusdPrice(), _getPigsBalance(), _getBusdBalance(), _getPigsBusdLpBalance()])
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
							The Animal Farm is the first deflationary, fully decentralized ownership yield farm/lending protocol where participants earn as an owner of the network. The super wealthy do not build and protect their wealth through
							selling their assets. They accumulate and then leverage their assets, while living off the dividends. The Animal Farm captures this financial power and puts it in the hands of the platforms participants.
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
