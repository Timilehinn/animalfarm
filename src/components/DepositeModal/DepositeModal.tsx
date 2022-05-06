import React, { useState } from 'react'
import { useAppSelector } from 'state/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import style from './DepositeModal.module.scss'
import { buyMoreTrufflesToAPiggyBank } from '../../api/Ipiggybank'
import { ZERO_ADDRESS } from '../../config/constants'
import { useAppDispatch } from '../../state/hooks'

interface depModal{
	id : string
}

function escapeRegExp(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

function DepositeModal({id}:depModal) {
	const [value, setValue] = useState('')

	const { library } = useActiveWeb3React()
	const signer = library.getSigner()

	const isOpen = useAppSelector((state) => state.toggleReducer.isDepositModalOpen)

	const enforcer = (nextUserInput: string) => {
		if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
			setValue(nextUserInput)
		}
	}

	const deposit = async() => {
		console.log(value)
		console.log((Number(value) * 10 ** 18).toString())
		try{
			const res = await buyMoreTrufflesToAPiggyBank(id,( (Number(value) * 10 ** 18) ).toString(),ZERO_ADDRESS, signer) 
			console.log(res)
		}catch(err){
			console.log(err)
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
			<button onClick={()=>deposit()} type='button' className={style.button}>
				Deposit
			</button>
		</div>
	)
}
export default DepositeModal
