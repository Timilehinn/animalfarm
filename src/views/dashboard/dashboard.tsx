import React from 'react'
import MobileNav from 'components/mobileNav/mobileNav'
import Nav from '../../components/nav/nav'
import SideNav from '../../components/sideNav/sideNav'
import style from './dashboard.module.css'
import Vault from '../../layouts/vault/vault'
import backgrounddesign  from '../../assets/img/desktopeffect.png'

function Dashboard() {
	return (
		<div className={style.wrap}>
			<Nav />
			<MobileNav />
			<div className={style.sidenav__vaults}>
				<SideNav />
				<Vault />
				
			</div>
			<div className={style.backgrounddesign}>
				<img src={backgrounddesign} alt=" "/>
			</div>
		</div>
	)
}

export default Dashboard
