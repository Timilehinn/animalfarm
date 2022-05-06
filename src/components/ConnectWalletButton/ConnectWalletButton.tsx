import React from 'react'
import { useAppDispatch } from 'state/hooks'
import { toggleModalBackDrop } from 'state/toggle'
import { useConnectWalletModal } from 'state/wallet/hooks'
import styles from './ConnectWalletButton.module.scss'

function ConnectWalletButton() {
	const dispatch = useAppDispatch()
	const { toggleConnectWalletModal } = useConnectWalletModal()

	const connect = () => {
		toggleConnectWalletModal(true)
		dispatch(toggleModalBackDrop(true))
	}

	return (
		<button className={styles.button__enabled} onClick={() => connect()} type='button'>
			Connect Wallet
		</button>
	)
}

export default ConnectWalletButton
