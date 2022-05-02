import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { toggleModalBackDrop } from 'state/toggle'
import styles from './TopNav.module.scss'
import logo from '../../assets/svgg.png'
import { useConnectWalletModal, useConnectWallet } from '../../state/wallet/hooks'
import wallet from '../../assets/wallet.png'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'



function TopNav() {
	const location = useLocation()
	const routeName = location.pathname.split('/')[1]
	const { account } = useActiveWeb3React()
	const dispatch = useAppDispatch()
	console.log(routeName)

	const { toggleConnectWalletModal } = useConnectWalletModal()
	const { isWalletConnected } = useConnectWallet()

	const connect = () => {
		toggleConnectWalletModal(true)
		dispatch( toggleModalBackDrop(true) )
	}

	

	return (
		<div className={styles.nav__wrap} >
			<div className={styles.nav}>
				<div className={styles.nav__in}>
					<h3>{routeName.length === 0 ? 'HOME' : routeName.split("-").join(" ").toUpperCase()}</h3>
					<button onClick={() => connect()} type='button'>
						<img src={wallet} alt='' />
						{	isWalletConnected ?
							<p>{account ? account.substring(0, 6) : ''}...{account ? account.substring(account.length - 4) : ''}</p> :
							<p>Connect Wallet</p>
						}
					</button>
				</div>
			</div>	
		</div>
		
	)
}

export default TopNav
