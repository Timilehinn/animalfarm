import React from 'react'
import { toggleModalBackDrop,toggleConfirmModal } from 'state/toggle'
import { useAppSelector,useAppDispatch } from 'state/hooks'
import styles from './ConfirmModal.module.scss'
import cancle from '../../assets/cancel.png'




function ConfirmModal() {

	const isModalActive = useAppSelector((state)=>state.toggleReducer.isConfirmModalActive)
	const dispatch = useAppDispatch()

	const closeModal = () => {
		dispatch(toggleConfirmModal(false))
		dispatch(toggleModalBackDrop(false))

	}

  return (
    <div className={ isModalActive ? `${styles.confirmModal} ${styles.confirmModal__active}` : `${styles.confirmModal}`}>
		<header>
			<p>Confirm Claim</p>
			<img  onClick={()=>closeModal()} src={cancle} alt="" />
		</header>
        <h3 className={styles.lp}>42</h3>
		<p className={styles.pigs}>PIGS/BUSD LP Tokens</p>
		<div className={styles.infoBox}>{}</div>
		<p className={styles.msg} >Are you sure you want to claim the specified amount of LP tokens to Piggy Bank?</p>
		<button type='button' >Claim</button>
    </div>
  )
}

export default ConfirmModal