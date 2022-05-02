import React from 'react'
import { Icon } from '@iconify/react'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { toggleMobileNav } from 'state/toggle'
import styles from './MobileNav.module.scss'
import logo from '../../assets/svgg.png'

function MobileNav() {
	const dispatch = useAppDispatch()
	const isNavActive = useAppSelector((state) => state.toggleReducer.isMobileNavActive)

	const toggleNav = () => {
		dispatch(toggleMobileNav(!isNavActive))
	}
	return (
		<div className={styles.mobilenav}>
			<nav>
				<div className={styles.log} >
					
					<img src={logo} alt="" />
					<h3>AnimalFarm</h3>
				</div>
				
				<Icon onClick={() => toggleNav()} icon='dashicons:menu' />
			</nav>
		</div>
	)
}

export default MobileNav
