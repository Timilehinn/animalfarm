import React from 'react'
import { connectorLocalStorageKey, walletLocalStorageKey } from 'components/ConnectWalletModal/config'
import { Config, Login, ConnectorNames } from 'components/ConnectWalletModal/types'
import style from './walletButton.module.css'

interface walletButtonProps {
	walletConfig: Config
	login: Login
	triggerConnect: () => void
	dismissModal: () => void
}

// function iOS() {
// 	return (
// 		['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
// 		// iPad on iOS 13 detection
// 		(navigator.userAgent.includes('Mac') && 'ontouchend' in document)
// 	)
// }

function WalletButton(props: walletButtonProps) {
	const { walletConfig, login, dismissModal, triggerConnect } = props

	const handleClick = () => {
		const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

		// Since iOS does not support Trust Wallet we fall back to WalletConnect
		if (walletConfig.title === 'Trust Wallet' && isIOS) {
			login(ConnectorNames.WalletConnect)
		} else {
			login(walletConfig.connectorId)
		}

		localStorage.setItem(walletLocalStorageKey, walletConfig.title)
		localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId)
		dismissModal()
		triggerConnect()

	}
	return (
		<div>
			<div role='button' tabIndex={0} className={style.button} onKeyDown={handleClick} onClick={handleClick}>
				<p>{walletConfig.title}</p>
				<img className={style.icon} src={walletConfig.icon} alt={walletConfig.title} />
			</div>
		</div>
	)
}

export default WalletButton
