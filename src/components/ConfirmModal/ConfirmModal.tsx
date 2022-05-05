/* eslint-disable react/no-array-index-key */
import React from 'react'
import { toggleModalBackDrop, toggleConfirmModal } from 'state/toggle'
import { useAppSelector, useAppDispatch } from 'state/hooks'
import Info from 'components/Info/Info'
import styles from './ConfirmModal.module.scss'
import cancle from '../../assets/cancel.png'

function ConfirmModal() {
	const isModalActive = useAppSelector((state) => state.toggleReducer.isConfirmModalActive)
	const modalProps = useAppSelector((state) => state.toggleReducer.confirmModalProps)
	const dispatch = useAppDispatch()

	const closeModal = () => {
		dispatch(toggleConfirmModal(false))
		dispatch(toggleModalBackDrop(false))
	}

	const confirm = () => {
		modalProps.confirmFunction()
	}

	return (
		<div className={isModalActive ? `${styles.confirmModal} ${styles.confirmModal__active}` : `${styles.confirmModal}`}>
			<header>
				<p>{modalProps.modalTitleText}</p>
				<img role='presentation' onClick={() => closeModal()} src={cancle} alt='' />
			</header>
			<h3 className={styles.lp}>{modalProps.value}</h3>
			<p className={styles.pigs}>{modalProps.text}</p>
			<div className={styles.infoBox}>
				{modalProps.infoValues.map((item, index) => (
					<Info key={`${index}${item.value}`} title={item.title} info={item.value} />
				))}
			</div>
			<p className={styles.msg}>{modalProps.warning}</p>
			<button onClick={() => confirm()} type='button'>
				{modalProps.confirmButtonText}
			</button>
		</div>
	)
}

export default ConfirmModal
