import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { toggleMobileNav } from 'state/toggle'

import styles from './MobileSideNav.module.scss'

function MobileSideNav() {
	const isNavActive = useAppSelector((state) => state.toggleReducer.isMobileNavActive)
	const dispatch = useAppDispatch()

	const closeNav = () => {
		dispatch(toggleMobileNav(false))
	}

	return (
		<div className={isNavActive ? `${styles.mobile} ${styles.mobile__active}` : `${styles.mobile}`}>
			<header>AnimalFarm</header>
			<ul>
				<Link onClick={() => closeNav()} className={styles.link} to='/'>
					<Icon icon='clarity:home-line' />
					<p>Home</p>
				</Link>
				<Link onClick={() => closeNav()} className={styles.link} to='pigs-credit'>
					<Icon icon='iconoir:small-shop' />
					<p>Pigs Credit</p>
				</Link>
				<Link onClick={() => closeNav()} to='/pigs-pen' className={styles.link}>
					<Icon icon='fluent:book-20-regular' />
					<p>Pigs Pen</p>
				</Link>
				<Link onClick={() => closeNav()} to='/piggy-bank' className={styles.link}>
					<Icon icon='iconoir:piggy-bank' />
					<p>Piggy Bank</p>
				</Link>
			</ul>
			<button type='button'>Connect wallet</button>
		</div>
	)
}

export default MobileSideNav
