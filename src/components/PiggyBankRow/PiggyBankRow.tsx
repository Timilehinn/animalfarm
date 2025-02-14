import React, { useState, useRef, useEffect } from 'react'
import { useAppDispatch } from 'state/hooks'
import { toggleModalBackDrop, toggleDepositModal } from 'state/toggle'
import { usePiggyBank } from 'state/piggybank/hooks'
import { BigNumber } from 'bignumber.js'
import { sellPiglets, compound } from 'api/piggyBank/getMyPiggyBanks'
import { fetchPiggyBankData } from 'api/Ipiggybank'
import DepositeModal from 'components/DepositeModal/DepositeModal'
import useToast from 'hooks/useToast'
import { useSpring, animated } from 'react-spring'
import { BIG_TEN } from 'utils/bigNumber'
import style from './PiggyBankRow.module.scss'
import up from '../../assets/up.svg'
import down from '../../assets/down.svg'

import useActiveWeb3React from '../../hooks/useActiveWeb3React'

function PiggyBankRow(props) {
	const { id, piglets, trufflesavailable, truffleLocker, trufflesvalue, timeLeftSinceLock, maxpayout, lastCompounded, paddedPrecisionValue, isMaxPayOut } = props
	const dispatch = useAppDispatch()
	const { account, library } = useActiveWeb3React()
	const signer = library.getSigner()
	const { setPiggyBank } = usePiggyBank()
	const { toastError, toastSuccess } = useToast()
	const catMenu = useRef(null)
	const prop = useSpring({ to: { opacity: 1, y: '0px' }, from: { opacity: 0 }, delay: 600, y: '20px' })

	// State
	const [state, showModal] = useState(false)
	// const [timerInterval, setTimerInterval] = useState<ReturnType<typeof setInterval>>()
	const [secondsString, setSecondsString] = useState('0h 0m 0s')

	useEffect(() => {
		const timeLeftToCompoundSeconds = Math.floor(Number(lastCompounded) + 86400 - Date.now() / 1000)
		setSecondsString(secondsToString(timeLeftToCompoundSeconds, false))
	}, [lastCompounded])

	const getMyPiggyBank = async () => {
		try {
			const res = await fetchPiggyBankData(account)
			setPiggyBank(res)
		} catch (err) {
			console.error(err)
		}
	}

	const closeDropDown = (e: any) => {
		if (catMenu.current && state && !catMenu.current.contains(e.target)) {
			showModal(false)
		}
	}

	document.addEventListener('click', closeDropDown)

	const openDepositModal = () => {
		showModal(false)
		dispatch(toggleDepositModal(true))
		dispatch(toggleModalBackDrop(true))
	}

	function secondsToString(seconds, showDays: boolean) {
		const secondsMaxxed = Math.max(seconds, 0)
		const numdays = Math.floor(secondsMaxxed / 86400)
		const numhours = Math.floor((secondsMaxxed % 86400) / 3600)
		const numminutes = Math.floor(((secondsMaxxed % 86400) % 3600) / 60)
		const numseconds = ((secondsMaxxed % 86400) % 3600) % 60

		return showDays ? `${numdays}d ${numhours}h ${numminutes}m ${numseconds}s` : `${numhours}h ${numminutes}m ${numseconds}s`
	}

	function getRemainingTime() {
		// const durationTimestamp = truffleLocker?.durationTimestamp
		// const startLockTimestamp = truffleLocker?.startLockTimestamp
		// const timeNow = Date.now() / 1000
		// const endDate = Number(startLockTimestamp) + Number(durationTimestamp)

		// return secondsToString(Math.round(endDate - timeNow))
		return secondsToString(timeLeftSinceLock, true)
	}

	const _sellPiglets = async () => {
		showModal(false)
		try {
			const res = await sellPiglets(id, signer)
			if (res.success) {
				getMyPiggyBank()
				toastSuccess('Sell Truffles Successfully!')
			} else {
				toastError('An error occurred! Try again')
			}
		} catch (err) {
			console.error(err)
		}
	}
	const _compound = async () => {
		showModal(false)
		try {
			const res = await compound(id, signer)
			if (res.success) {
				getMyPiggyBank()
				toastSuccess('Compound Successful!')
			} else {
				toastError('An error occurred! Try again')
			}
		} catch (err) {
			console.error(err)
		}
	}

	// button control
	// check if last time compounded is greater than 24 hours
	const isCompoundEnabled = Math.floor(Date.now() / 1000) - lastCompounded > 86400

	const isSellDisabled = Date.now() / 1000 < Number(truffleLocker.duration) * 7 * 86400 + Number(truffleLocker.startLockTimestamp)

	return (
		<tr ref={catMenu} className={style.tr}>
			<td>{id}</td>
			<td>{new BigNumber(piglets).dividedBy(BIG_TEN.pow(paddedPrecisionValue)).toString()}</td>
			<td>{trufflesavailable}</td>
			<td>{trufflesvalue}</td>
			<td>{getRemainingTime()}</td>
			<td>{maxpayout}</td>
			<td>
				<div className={style.action}>
					<button className={style.button} type='button' onClick={() => showModal(!state)}>
						Action
						{state === false ? <img src={up} alt='' /> : <img src={down} alt='' />}
					</button>
					{state && (
						<animated.div style={prop} className={style.modal}>
							<button disabled={isSellDisabled} onClick={() => _sellPiglets()} type='button' className={isSellDisabled ? `${style.modal__button} ${style.button__disabled}` : style.modal__button}>
								Sell
							</button>
							<hr />
							<button disabled={!isCompoundEnabled} onClick={() => _compound()} type='button' className={!isCompoundEnabled ? `${style.modal__button} ${style.button__disabled}` : style.modal__button}>
								Compound
							</button>
							<hr />
							<button disabled={isMaxPayOut} onClick={() => openDepositModal()} type='button' className={!isCompoundEnabled ? `${style.modal__button} ${style.button__disabled}` : style.modal__button}>
								Deposit
							</button>
						</animated.div>
					)}
				</div>
				<p className={style.comp}>Compound in : {secondsString}</p>
			</td>
			<DepositeModal id={id} />
		</tr>
	)
}

export default PiggyBankRow
