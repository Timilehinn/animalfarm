import React from 'react'

import { useAppSelector, useAppDispatch } from 'state/hooks'
import { toggleTourModal } from 'state/toggle'
import styles from './TourModal.module.scss'

function TourModal() {
	const isTourModalActive = useAppSelector((state) => state.toggleReducer.isTourModalOpen)
	const dispatch = useAppDispatch()

	const close = () => {
		dispatch(toggleTourModal({ state: false, msg: '' }))
	}

	const disableAppTour = () => {
		localStorage.setItem('piggyBankInfo', 'piggyBankInfo')
		localStorage.setItem('pigCreditInfo', 'pigCreditInfo')
		localStorage.setItem('pigPenInfo', 'pigPenInfo')
    dispatch(toggleTourModal({ state: false, msg: '' }))
	}

	return (
		<div className={isTourModalActive.state ? `${styles.tour} ${styles.tour__active}` : `${styles.tour}`}>
			<p style={{ marginBottom: '10px' }}> {isTourModalActive.msg} </p>
			<a href={`${window.location.origin}/docs/Animal_Farm_Rebirth_-_Migration__White_Paper_002.pdf`} className={styles.learn}>
				Learn more
			</a>
		
			<button type='button' onClick={() => close()}>
				Got it
			</button>
		</div>
	)
}

export default TourModal
