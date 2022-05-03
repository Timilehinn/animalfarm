import React from 'react'
import { useAppSelector } from 'state/hooks'
import style from './DepositeModal.module.scss'


function DepositeModal() {

  const isOpen = useAppSelector((state)=>state.toggleReducer.isDepositModalOpen)
  
  return (
    <div className={ isOpen ?  `${style.deposite__modal} ${style.deposite__modal__active}` : `${style.deposite__modal}` }>
      <input type='number' className={style.input} placeholder='Enter the amount of PIGS/BUSD LP to deposit' />
      <button type='button' className={style.button}>
          Deposit
      </button>
    </div>
  )
}
export default DepositeModal