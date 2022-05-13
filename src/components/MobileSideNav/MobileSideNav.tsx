import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { useConnectWalletModal, useConnectWallet } from 'state/wallet/hooks'
import { toggleModalBackDrop, toggleMobileNav } from 'state/toggle'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

import styles from './MobileSideNav.module.scss'

function MobileSideNav() {
	const isNavActive = useAppSelector((state) => state.toggleReducer.isMobileNavActive)
	const dispatch = useAppDispatch()
	const { account } = useActiveWeb3React()

	const closeNav = () => {
		dispatch(toggleMobileNav(false))
	}

	const { toggleConnectWalletModal } = useConnectWalletModal()
	const { isWalletConnected } = useConnectWallet()

	const connect = () => {
		toggleConnectWalletModal(true)
		dispatch(toggleModalBackDrop(true))
		dispatch(toggleMobileNav(false))
	}

	return (
		<div className={isNavActive ? `${styles.mobile} ${styles.mobile__active}` : `${styles.mobile}`}>
			<header>
				<h3>Animal Farm</h3>
				<Icon onClick={() => closeNav()} icon='pepicons:times' />
			</header>
			<ul>
				<NavLink onClick={() => closeNav()} className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)} to='/'>
					<Icon icon='clarity:home-line' />
					<p>Home</p>
				</NavLink>
				<NavLink onClick={() => closeNav()} className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)} to='pigs-credit'>
					<Icon icon='iconoir:small-shop' />
					<p>Pigs Credit</p>
				</NavLink>
				<NavLink onClick={() => closeNav()} to='/pigs-pen' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='fluent:book-20-regular' />
					<p>Pigs Pen</p>
				</NavLink>
				<NavLink onClick={() => closeNav()} to='/piggy-bank' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='iconoir:piggy-bank' />
					<p>Piggy Bank</p>
				</NavLink>
				<a className={styles.link} href='https://pancakeswap.finance/info/token/0x9a3321E1aCD3B9F6debEE5e042dD2411A1742002' target='_blank' rel='noreferrer'>
					<Icon icon='fa6-solid:money-check-dollar' />
					<p>Buy / Add Liquidity</p>
				</a>
				<a className={styles.link} href='https://themanor.farm/garden'>
					<Icon icon='maki:garden' />
					<p>Drip Garden</p>
				</a>
				<a className={styles.link} href={`${window.location.origin}/docs/Animal_Farm_Rebirth_-_Migration__White_Paper_002.pdf`}>
					<Icon icon='ep:document-checked' />
					<p>Documentation</p>
				</a>
				<NavLink onClick={() => closeNav()} to='/migrate' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='iconoir:piggy-bank' />
					<p>Migrate</p>
				</NavLink>
				<a className={styles.link} href='https://theanimal.farm/dripliberation'>
					<Icon icon='bx:bar-chart-alt-2' />
					<p>Drip Liberation</p>
				</a>
			</ul>
			<button onClick={() => connect()} type='button'>
				{isWalletConnected ? (
					<p>
						{account ? account.substring(0, 6) : ''}
						...
						{account ? account.substring(account.length - 4) : ''}
					</p>
				) : (
					<p>Connect Wallet</p>
				)}
			</button>
		</div>
	)
}

export default MobileSideNav
