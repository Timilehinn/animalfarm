import { useAppSelector, useAppDispatch } from '../hooks'
import { setPigsBalance as _setPigsBalance, setAllBalance as _setAllBalance, Balance } from './index'

export function usePigsBalance() {
	const dispatch = useAppDispatch()
	const pigsBalance = useAppSelector((state) => state.balanceReducer.pigsBalance)
	const setPigsBalance = (value: Balance) => dispatch(_setPigsBalance(value))

	return { pigsBalance, setPigsBalance }
}

export function useAllBalance() {
	const dispatch = useAppDispatch()
	const allBalance = useAppSelector((state) => state.balanceReducer.allBalance)
	const setAllBalance = (value: Balance[]) => dispatch(_setAllBalance(value))

	return { allBalance, setAllBalance }
}
