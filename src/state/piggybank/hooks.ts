import { useAppSelector, useAppDispatch } from '../hooks'
import { fetchStart, fetchFailed, piggybankFetchSucceeded, setAllowance as _setAllowance, PiggyBank } from './index'

export const usePiggyBank = () => {
	const dispatch = useAppDispatch()

	const piggybank = useAppSelector((state) => state.piggyBankReducer.data)
	const isLoading = useAppSelector((state) => state.piggyBankReducer.isLoading)
	const setPiggyBank = (value: PiggyBank) => dispatch(piggybankFetchSucceeded(value))
	const setAllowance = (value: string) => dispatch(_setAllowance(value))
	const setFetchStart = () => dispatch(fetchStart())
	const setFetchFailed = () => dispatch(fetchFailed())

	return { piggybank, isLoading, setPiggyBank, setAllowance, setFetchStart, setFetchFailed }
}
