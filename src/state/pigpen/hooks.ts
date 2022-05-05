import { useAppSelector, useAppDispatch } from '../hooks'
import { setPigPenData as _setPigPenData, setUserData as _setUserData, PigPen, PigPenUserData } from './index'

export const usePigPen = () => {
	const dispatch = useAppDispatch()

	const pigPenData = useAppSelector((state) => state.pigPenReducer.pigPendata)
	const userData = useAppSelector((state) => state.pigPenReducer.userData)
	const userDataLoaded = useAppSelector((state) => state.pigPenReducer.userDataLoaded)

	const setPigPenData = (value: PigPen) => dispatch(_setPigPenData(value))
	const setUserData = (value: PigPenUserData) => dispatch(_setUserData(value))

	return { pigPenData, userData, userDataLoaded, setPigPenData, setUserData }
}
