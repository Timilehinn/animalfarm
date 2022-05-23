import React, { useEffect, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { getPigsBUSDPrice } from 'utils/getPrice'
// import useActiveWeb3React from 'hooks/useActiveWeb3React'
// import { getAllBalance } from 'api/getBalance'
import useAuth from 'hooks/useAuth'
import { useAppDispatch } from 'state/hooks'
import { usePricing } from 'state/pricing/hooks'
import SideNavigation from 'components/SideNavigation/SideNavigation'
import TopNav from 'components/TopNav/TopNav'
import PigsCredit from 'views/pigsCredit/PigsCredit'
import PiggyBank from 'views/piggyBank/PiggyBank'
import PigsPen from 'views/pigsPen/PigsPen'
import MobileSideNav from 'components/MobileSideNav/MobileSideNav'
import Toast from 'components/Toast/Toast'
import Migrate from 'views/Imigrate/Imigrate'
import TourModal from 'components/TourModal/TourModal'
import ErrorPage from 'views/404/ErrorPage'
import Settings from 'components/Settings/Settings'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'

import ConnectWalletModal from '../../components/ConnectWalletModal/ConnectWalletModal'
import MobileNav from '../../components/MobileNav/MobileNav'

import Home from '../home/Home'
import style from './Landing.module.scss'

const AddLiquidity = React.lazy(() => import('../addLiquidity/AddLiquidity'))

function Landing() {
	const { login } = useAuth()
	const dispatch = useAppDispatch()
	const { setPigsBusdPrice } = usePricing()

	const getBusdPrice = async () => {
		try {
			const res = await getPigsBUSDPrice()
			dispatch(setPigsBusdPrice(res))
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		const priceInterval = setInterval(() => {
			// console.log('I am running every ten secs')
			getBusdPrice()
		}, 10000)
		return () => {
			clearInterval(priceInterval)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={style.landing}>
			<SideNavigation />
			<div className={style.landing__wrap}>
				<TopNav />
				<MobileNav />
				<MobileSideNav />
				<ConnectWalletModal login={login} />
				<ConfirmModal />
				<Toast />
				{/* <Settings /> */}
				<TourModal />
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/pigs-credit' element={<PigsCredit />} />
						<Route path='/pigs-pen' element={<PigsPen />} />
						<Route path='/piggy-bank' element={<PiggyBank />} />
						<Route path='/migrate' element={<Migrate />} />
						<Route path='/piggy-bank/:referee' element={<PiggyBank />} />
						<Route path='/add-liquidity' element={<AddLiquidity />} />
						<Route path='*' element={<ErrorPage />} />
					</Routes>
				</Suspense>
			</div>
		</div>
	)
}

export default Landing
