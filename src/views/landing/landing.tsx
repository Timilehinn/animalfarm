import React, { Suspense } from 'react'
import { useConnectWallet, useConnectWalletModal } from 'state/wallet/hooks'
import { useRoutes, Route, Routes } from 'react-router-dom'
// import useActiveWeb3React from 'hooks/useActiveWeb3React'
// import { getAllBalance } from 'api/getBalance'
import useAuth from 'hooks/useAuth'
import SideNavigation from 'components/SideNavigation/SideNavigation'
import TopNav from 'components/TopNav/TopNav'
import PigsCredit from 'views/pigsCredit/PigsCredit'
import PiggyBank from 'views/piggyBank/PiggyBank'
import GenericBackground from 'components/GenericBackground/GenericBackground'
import PigsPen from 'views/pigsPen/PigsPen'
import MobileSideNav from 'components/MobileSideNav/MobileSideNav'
import Toast from 'components/Toast/Toast'
import Migrate from 'views/Imigrate/Imigrate'
import DepositeModal from 'components/DepositeModal/DepositeModal'
import TourModal from 'components/TourModal/TourModal'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import ConnectWalletModal from '../../components/ConnectWalletModal/ConnectWalletModal'
import MobileNav from '../../components/MobileNav/MobileNav'


 
import Home from '../home/Home'
import style from './Landing.module.scss'

function Landing() {
	const { login } = useAuth()

	const { toggleConnectWalletModal } = useConnectWalletModal()

	const connect = () => {
		toggleConnectWalletModal(true)
	}

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
				<DepositeModal />
				<TourModal />
				<Routes>
					
					<Route path='/' element={<Home />} />
					<Route path='/pigs-credit' element={<PigsCredit />} />
					<Route path='/pigs-pen' element={<PigsPen />} />
					<Route path='/piggy-bank' element={<PiggyBank />} />
					<Route path='/migrate' element={<Migrate />} />
					<Route path='/piggy-bank/:referee' element={<PiggyBank />} />
					<Route path='*' element={<div>Not found</div>} />
				</Routes>
			</div>
		</div>
	)
}

export default Landing
