import React, { useEffect, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { getPigsBUSDPrice } from 'utils/getPrice'

import useAuth from 'hooks/useAuth'
import { useAppDispatch } from 'state/hooks'
import { usePricing } from 'state/pricing/hooks'
import SideNavigation from 'components/SideNavigation/SideNavigation'
import TopNav from 'components/TopNav/TopNav'
import MobileSideNav from 'components/MobileSideNav/MobileSideNav'
import Toast from 'components/Toast/Toast'
import Migrate from 'views/Imigrate/Imigrate'
import TourModal from 'components/TourModal/TourModal'
import ErrorPage from 'views/404/ErrorPage'

import GardeningModal from 'components/GardeningModal/GardeningModal'
import FaqModal from 'components/FaqModal/FaqModal'

import GardenConfirmModal from 'components/SwapConfirmModal/SwapConfirmModal'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'

import ConnectWalletModal from '../../components/ConnectWalletModal/ConnectWalletModal'
import MobileNav from '../../components/MobileNav/MobileNav' 
import UnstakeModal from '../../components/UnstakeModal/UnstakeModal'

import Home from '../home/Home'
import style from './Landing.module.scss'

// Pages import
const PigsCredit = React.lazy(()=>import('../pigsCredit/PigsCredit'))
const PigsPen = React.lazy(()=>import('../pigsPen/PigsPen'))
const PiggyBank = React.lazy(()=>import('../piggyBank/PiggyBank'))
const AddLiquidity = React.lazy(() => import('../addLiquidity/AddLiquidity'))
const Farms = React.lazy(() => import('../farms/Farms'))
const Swap = React.lazy(() => import('../swap/Swap'))
const Pools = React.lazy(() => import('../pools/Pools'))
const Garden = React.lazy(() => import('../garden/Garden'))
const DripLiberation = React.lazy(() => import('../dripLiberation/DripLiberation'))



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
		}, 5000)
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
				<UnstakeModal />
				<GardenConfirmModal />
				<Toast />
				<GardeningModal />
				<FaqModal />

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
						<Route path='/farms' element={<Farms />} />
						<Route path='/farms/:referee' element={<Farms />} />
						<Route path='/pools' element={<Pools />} />
						<Route path='/swap' element={<Swap />} />
						<Route path='/drip-liberation' element={<DripLiberation />} /> 
						<Route path='/garden' element={<Garden />} />
						<Route path='/garden/:referee' element={<Garden />} />
						<Route path='*' element={<ErrorPage />} />
					</Routes>
				</Suspense>
			</div>
		</div>
	)
}

export default Landing
