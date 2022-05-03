import { useAppSelector, useAppDispatch } from '../hooks'
import { setIsConnected, ToggleWalletModal } from './index'

export function useConnectWallet() {
	const dispatch = useAppDispatch()
	const isWalletConnected = useAppSelector((state) => state.walletReducer.isConnected)
	const setIsWalletConnected = (value: boolean) => dispatch(setIsConnected(value))
	// wallet modal

	return { isWalletConnected, setIsWalletConnected }
}

export function useConnectWalletModal() {
	const dispatch = useAppDispatch()

	// wallet modal
	const isModalOpen = useAppSelector((state) => state.walletReducer.isModalOpen)
	const toggleConnectWalletModal = (value: boolean) => dispatch(ToggleWalletModal(value))

	return { isModalOpen, toggleConnectWalletModal }
}
