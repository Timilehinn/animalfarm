import React, { Fragment } from 'react'
import WalletButton from 'components/ConnectWalletModal/WalletButton/WalletButton'
import { useConnectWalletModal,useConnectWallet } from 'state/wallet/hooks'
import { useAppDispatch } from 'state/hooks'
import { toggleModalBackDrop } from 'state/toggle'
import config, { walletLocalStorageKey } from './config'
import { Config, Login } from './types'



import style from './connectWalletModal.module.css'
import help from './Icons/help-circle.png'

interface ConnectWalletProps {
	login: Login
}

/**
 * Checks local storage if we have saved the last wallet the user connected with
 * If we find something we put it at the top of the list
 *
 * @returns sorted config
 */
const getPreferredConfig = (walletConfig: Config[]) => {
	const preferredWalletName = localStorage.getItem(walletLocalStorageKey)
	const sortedConfig = walletConfig.sort((a: Config, b: Config) => a.priority - b.priority)

	if (!preferredWalletName) {
		return sortedConfig
	}

	const preferredWallet = sortedConfig.find((sortedWalletConfig) => sortedWalletConfig.title === preferredWalletName)

	if (!preferredWallet) {
		return sortedConfig
	}

	return [preferredWallet, ...sortedConfig.filter((sortedWalletConfig) => sortedWalletConfig.title !== preferredWalletName)]
}

function ConnectWalletModal(props: ConnectWalletProps) {
	const { login } = props
	const { isModalOpen, toggleConnectWalletModal } = useConnectWalletModal()
	const { setIsWalletConnected } = useConnectWallet()
	const sortedConfig = getPreferredConfig(config)
	const dispatch = useAppDispatch()

	const dismissModal = () => {
		toggleConnectWalletModal(false)
	}

	const triggerConnect =() => {
		setIsWalletConnected(true)
		dispatch( toggleModalBackDrop(false) )
	}

	return (
		<div>
			<div className={isModalOpen ? `${style.walletModal} ${style.walletModal__active}` : style.walletModal}>
				<nav className={style.header}>
					<p className={style.walletModal__p}>Select a wallet to connect</p>
					<img src={help} alt='help icon' />
				</nav>

				{sortedConfig.map((wallet) => (
					<Fragment key={wallet.title}>
						<WalletButton walletConfig={wallet} triggerConnect={triggerConnect}  login={login} dismissModal={dismissModal} />
					</Fragment>
				))}
			</div>
		</div>
	)
}

export default ConnectWalletModal
