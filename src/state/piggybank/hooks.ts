import { useAppSelector, useAppDispatch } from '../hooks'
import { fetchStart, fetchFailed, piggybankFetchSucceeded, PiggyBank } from './index'

export const usePiggyBank = () => {
	const dispatch = useAppDispatch()

	const piggybank = useAppSelector((state) => state.piggyBankReducer.data)
	const isLoading = useAppSelector((state) => state.piggyBankReducer.isLoading)
	// const isInitialized = useAppSelector((state) => state.piggyBankReducer.isInitialized)
	const setPiggyBank = (value: any) => dispatch(piggybankFetchSucceeded(value))
	const setFetchStart = () => dispatch(fetchStart())
	const setFetchFailed = () => dispatch(fetchFailed())

	return { piggybank, isLoading, setPiggyBank, setFetchStart, setFetchFailed }
}
