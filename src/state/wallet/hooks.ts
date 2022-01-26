import { useAppSelector, useAppDispatch } from '../hooks'
import {
	setIsConnected,
	ToggleWalletModal,
	setVaultBtcBalance as _setVaultBtcBalance,
	setVaultSBalance as _setVaultSBalance,
	setAllVaultXBalance as _setAllVaultXBalance,
	setAllVaultSBalance as _setAllVaultSBalance,
	setSurgeBtcBalance as _setSurgeBtcBalance,
	setSurgeEthBalance as _setSurgeEthBalance,
	setAllSurgeBalance as _setAllSurgeBalance,
	setAllBalance as _setAllBalance,
	setVaultXRewardBalance as _setVaultXRewardBalance,
	setVaultSRewardBalance as _setVaultSRewardBalance,
	Balance,
} from './index'

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

export function useVaultBtc() {
	const dispatch = useAppDispatch()
	const vaultBtcBalance = useAppSelector((state) => state.walletReducer.vaultBtcBalance)
	const setVaultBtcBalance = (value: Balance) => dispatch(_setVaultBtcBalance(value))

	return { vaultBtcBalance, setVaultBtcBalance }
}

export function useVaultEth() {
	const dispatch = useAppDispatch()
	const vaultSBalance = useAppSelector((state) => state.walletReducer.vaultSBalance)
	const setVaultSBalance = (value: Balance) => dispatch(_setVaultSBalance(value))

	return { vaultSBalance, setVaultSBalance }
}

export function useSurgeBtc() {
	const dispatch = useAppDispatch()
	const surgeBtcBalance = useAppSelector((state) => state.walletReducer.surgeBtcBalance)
	const setSurgeBtcBalance = (value: Balance) => dispatch(_setSurgeBtcBalance(value))

	return { surgeBtcBalance, setSurgeBtcBalance }
}

export function useSurgeEth() {
	const dispatch = useAppDispatch()
	const surgeEthBalance = useAppSelector((state) => state.walletReducer.surgeEthBalance)
	const setSurgeEthBalance = (value: Balance) => dispatch(_setSurgeEthBalance(value))

	return { surgeEthBalance, setSurgeEthBalance }
}

export function useAllVaultXBalance() {
	const dispatch = useAppDispatch()
	const allVaultXBalance = useAppSelector((state) => state.walletReducer.allVaultXBalance)
	const setAllVaultXBalance = (value: Balance[]) => dispatch(_setAllVaultXBalance(value))

	return { allVaultXBalance, setAllVaultXBalance }
}

export function useAllVaultSBalance() {
	const dispatch = useAppDispatch()
	const allVaultSBalance = useAppSelector((state) => state.walletReducer.allVaultSBalance)
	const setAllVaultSBalance = (value: Balance[]) => dispatch(_setAllVaultSBalance(value))

	return { allVaultSBalance, setAllVaultSBalance }
}

export function useAllSurgeBalance() {
	const dispatch = useAppDispatch()
	const allSurgeBalance = useAppSelector((state) => state.walletReducer.allSurgeBalance)
	const setAllSurgeBalance = (value: Balance[]) => dispatch(_setAllSurgeBalance(value))

	return { allSurgeBalance, setAllSurgeBalance }
}

export function useAllBalance() {
	const dispatch = useAppDispatch()
	const allBalance = useAppSelector((state) => state.walletReducer.allBalance)
	const setAllBalance = (value: Balance[]) => dispatch(_setAllBalance(value))

	return { allBalance, setAllBalance }
}

export function useVaultXRewardBalance() {
	const dispatch = useAppDispatch()
	const vaultXrewardBalance = useAppSelector((state) => state.walletReducer.vaultXrewardBalance)
	const setVaultXRewardBalance = (value: Balance) => dispatch(_setVaultXRewardBalance(value))

	return { vaultXrewardBalance, setVaultXRewardBalance }
}

export function useVaultSRewardBalance() {
	const dispatch = useAppDispatch()
	const vaultSrewardBalance = useAppSelector((state) => state.walletReducer.vaultSrewardBalance)
	const setVaultSRewardBalance = (value: Balance) => dispatch(_setVaultSRewardBalance(value))

	return { vaultSrewardBalance, setVaultSRewardBalance }
}
