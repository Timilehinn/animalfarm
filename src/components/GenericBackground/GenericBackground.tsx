import React from 'react'
import style from './background.module.css'
import { useConnectWalletModal } from '../../state/wallet/hooks'

function GenericBackground() {
	const { isModalOpen, toggleConnectWalletModal } = useConnectWalletModal()

	const closeWalletModal = () => {
		toggleConnectWalletModal(false)
	}
	
	return (
		<div>
			<div role='button' tabIndex={0} onKeyDown={closeWalletModal} onClick={closeWalletModal} className={isModalOpen ? `${style.modalBackground__active} ${style.modalBackground}` : `${style.modalBackground}`}>
				{}
			</div>
		</div>
	)
}

export default GenericBackground
