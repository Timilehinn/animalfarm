import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useAppSelector } from 'state/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { usePiggyBank } from 'state/piggybank/hooks'
import { getBalanceAmountString, getDecimalAmount, amountFormatter } from 'utils/formatBalance'
import { approvePiggyBankForPigBusdLP } from 'api/allowance'
import { buyMoreTrufflesToAPiggyBank } from '../../api/Ipiggybank'
import { LARGE_NUMBER, ZERO_ADDRESS } from '../../config/constants'
import { useAppDispatch } from '../../state/hooks'
import { toggleModalBackDrop, toggleDepositModal } from '../../state/toggle'
import useToast from '../../hooks/useToast'
import style from './DepositeModal.module.scss'

interface depModal {
	id: string
}

function escapeRegExp(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

function DepositeModal({ id }: depModal) {
	const [value, setValue] = useState('')
	const [pending, setPending] = useState(false)
	const [isApproved, setIsApproved] = useState(false)

	const { library } = useActiveWeb3React()
	const signer = library.getSigner()
	const dispatch = useAppDispatch()
	const { piggybank, setPiggyBank, setAllowance } = usePiggyBank()
	const { toastSuccess, toastError } = useToast()

	const isOpen = useAppSelector((state) => state.toggleReducer.isDepositModalOpen)

	const enforcer = (nextUserInput: string) => {
		if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
			setValue(nextUserInput)
			checkButtonAndApproval(nextUserInput)
		}
	}
	/// Helper Functions ///
	const shouldDisableMainButton = (): boolean => {
		if (!value || (value === '0' && !isApproved)) {
			return true
		}

		if (new BigNumber(piggybank.userData.lpAllowance).isLessThan(getDecimalAmount(value))) {
			return true
		}
		return false
	}
	const showApproveButton = (): boolean => {
		if (!value || (value === '0' && isApproved)) {
			return false
		}
		if (new BigNumber(piggybank.userData.lpAllowance).isLessThan(getDecimalAmount(value))) {
			return true
		}
		return false
	}
	const checkButtonAndApproval = (inputvalue: string) => {
		if (new BigNumber(piggybank.userData.lpAllowance).isLessThan(getDecimalAmount(inputvalue)) && inputvalue) {
			setIsApproved(false)
		}

		if (new BigNumber(piggybank.userData.lpAllowance).isGreaterThanOrEqualTo(getDecimalAmount(inputvalue)) && inputvalue) {
			setIsApproved(true)
		}
	}

	// API CALLS
	const approve = async () => {
		setPending(true)
		try {
			await approvePiggyBankForPigBusdLP(LARGE_NUMBER, signer)
			setAllowance(LARGE_NUMBER)
			setPending(false)
			setIsApproved(true)
			// await getMyPiggyBank()
		} catch (err) {
			setPending(false)
			setIsApproved(false)
		}
	}

	const deposit = async () => {
		if (!value) return
		try {
			const res = await buyMoreTrufflesToAPiggyBank(id, getDecimalAmount(value), ZERO_ADDRESS, signer)

			if (res.success === true) {
				setValue('')
				toastSuccess(res.message)
				dispatch(toggleDepositModal(false))
				dispatch(toggleModalBackDrop(false))
			}

			if (res.success === false) {
				toastError(res.message)
			}
		} catch (err) {
			console.error(err)
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
			<button onClick={() => deposit()} disabled={shouldDisableMainButton()} type='button' className={shouldDisableMainButton() ? `${style.button__disabled}` : style.button__enabled}>
				Deposit
			</button>
			{showApproveButton() && (
				<button onClick={() => approve()} disabled={pending} type='button' className={pending ? `${style.button__disabled}` : style.button__enabled}>
					Approve
				</button>
			)}
		</div>
	)
}
export default DepositeModal
