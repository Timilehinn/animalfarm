/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { connectorLocalStorageKey, walletLocalStorageKey } from 'components/modals/connectWallet/config'
import { Config, Login, ConnectorNames } from 'components/modals/connectWallet/types'
import style from './walletButton.module.css'

interface walletButtonProps {
	walletConfig: Config
	login: Login
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
	const { walletConfig, login, dismissModal } = props
	return (
		<div>
			<div
				className={style.button}
				onClick={() => {
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
				}}
			>
				<p>{walletConfig.title}</p>
				<img className={style.icon} src={walletConfig.icon} alt={walletConfig.title} />
			</div>
		</div>
	)
}

export default WalletButton
