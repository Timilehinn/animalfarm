import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { useConnectWalletModal,useConnectWallet } from 'state/wallet/hooks'
import { toggleModalBackDrop,toggleMobileNav } from 'state/toggle'
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
		dispatch( toggleModalBackDrop(true) )
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
				<Link onClick={() => closeNav()} to='/' className={styles.link}>
					<Icon icon='iconoir:piggy-bank' />
					<p>Piggy Bank</p>
				</Link>
			</ul>
			<button onClick={()=>connect()} type='button'>
				{	isWalletConnected ?
							<p>{account ? account.substring(0, 6) : ''}...{account ? account.substring(account.length - 4) : ''}</p> :
							<p>Connect Wallet</p>
						}
			</button>
		</div>
	)
}

export default MobileSideNav
