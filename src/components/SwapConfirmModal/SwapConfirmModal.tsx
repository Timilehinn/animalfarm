import React from 'react'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import { toggleSwapModal, toggleModalBackDrop } from 'state/toggle'
import styles from './SwapConfirmModal.module.scss'
import cancel from '../../assets/cancel.png'
import swap from '../../assets/swap.png'

function GardenConfirmModal() {
	const swapModalState = useAppSelector((state) => state.toggleReducer.swapModalProps)
	const dispatch = useAppDispatch()

	const closeModal = () => {
		dispatch(toggleSwapModal({ isSwapModalOpen: false, swapingFrom: { amount: '', tokenName: '' }, swapingTo: { amount: '', tokenName: '' } }))
		dispatch(toggleModalBackDrop(false))
	}

	const confirm = () => {
		swapModalState.confirmFunction()
		closeModal()
	}
	return (
		<div className={swapModalState.isSwapModalOpen ? `${styles.confirmModal} ${styles.confirmModal__active}` : `${styles.confirmModal}`}>
			<header>
				<p>Confirm swap</p>
				<img onClick={() => closeModal()} role='presentation' src={cancel} alt='' />
			</header>
			<div className={styles.body}>
				<h3>{swapModalState.swapingFrom.amount}</h3>
				<p>{swapModalState.swapingFrom.tokenName}</p>
				<img src={swap} alt='' />
				<h3>{swapModalState.swapingTo.amount}</h3>
				<p>{swapModalState.swapingTo.tokenName}</p>
			</div>
			<p className={styles.warning}>
				*Estimated {swapModalState.swapingFrom.tokenName} to {swapModalState.swapingTo.tokenName} amount
			</p>
			<button onClick={() => confirm()} type='button'>
				Confirm
			</button>
		</div>
	)
}

export default GardenConfirmModal
