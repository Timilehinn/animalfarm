import React, { useState } from 'react'
import { useAppSelector } from 'state/hooks'
import style from './DepositeModal.module.scss'

function escapeRegExp(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

function DepositeModal() {
	const [value, setValue] = useState('')

	const isOpen = useAppSelector((state) => state.toggleReducer.isDepositModalOpen)

	const enforcer = (nextUserInput: string) => {
		if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
			setValue(nextUserInput)
		}
	}

	return (
		<div className={isOpen ? `${style.deposite__modal} ${style.deposite__modal__active}` : `${style.deposite__modal}`}>
			<input
				value={value}
				onChange={(event) => {
					// replace commas with periods, because we exclusively uses period as the decimal separator
					enforcer(event.target.value.replace(/,/g, '.'))
				}}
				type='text'
				autoComplete='off'
				autoCorrect='off'
				pattern='^[0-9]*[.,]?[0-9]*$'
				minLength={1}
				maxLength={79}
				spellCheck='false'
				className={style.input}
				placeholder='Enter the amount of PIGS/BUSD LP to deposit'
			/>
			<button type='button' className={style.button}>
				Deposit
			</button>
		</div>
	)
}
export default DepositeModal
