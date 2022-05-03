import React from 'react'
import style from './DepositeModal.module.scss'

function DepositeModal() {
  return (
    <div className={style.deposite__modal}>
        <input type='number' className={style.input} placeholder='Enter the amount of PIGS/BUSD LP to deposit' />
        <button type='button' className={style.button}>
            Deposit
        </button>
    </div>
  )
}
export default DepositeModal