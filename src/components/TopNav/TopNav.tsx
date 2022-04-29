import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './TopNav.module.scss'
import { useConnectWalletModal, useConnectWallet } from '../../state/wallet/hooks'
import wallet from '../../assets/wallet.png'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'

function TopNav() {
	const location = useLocation()
	const routeName = location.pathname.split('/')[1]
	const { account } = useActiveWeb3React()
	console.log(routeName)

	const { toggleConnectWalletModal } = useConnectWalletModal()
	const { isWalletConnected } = useConnectWallet()

	const connect = () => {
		toggleConnectWalletModal(true)
	}

	return (
		<div className={styles.nav__wrap} >
			<div className={styles.nav}>
				<div className={styles.nav__in}>
					<h3>{routeName.length === 0 ? 'Home' : routeName}</h3>
					<button onClick={() => connect()} type='button'>
						<img src={wallet} alt='' />
						<p>{isWalletConnected ? 'Disconnect' : 'Connect Wallet'}</p>
					</button>
				</div>
			</div>	
		</div>
		
	)
}

export default TopNav
