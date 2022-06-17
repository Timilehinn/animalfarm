import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import { type AppState } from 'state'
import { GardenState } from '../types'
import { fetchGardenDataAsync } from '.'

export const useGarden = () => {
	const { account } = useWeb3React()
	const { isInitialized, isLoading, data }: GardenState = useSelector((state: AppState) => state.dripGardenReducer)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchGardenDataAsync({ account }))
	}, [dispatch, account])

	return { garden: data, isInitialized, isLoading }
}

export const usePollGardenData = () => {
	const dispatch = useAppDispatch()
	const { account } = useWeb3React()

	const fetchDripGardenData = () => {
		dispatch(fetchGardenDataAsync({ account }))
	}

	return {
		fetchDripGardenData,
	}
}
