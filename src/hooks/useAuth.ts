import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect, WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ConnectorNames, connectorLocalStorageKey } from 'components/ConnectWalletModal'
import { connectorsByName } from 'utils/web3React'
import { setupNetwork } from 'utils/wallet'
import useToast from 'hooks/useToast'

const useAuth = () => {
	const { activate, deactivate } = useWeb3React()
	const { toastError } = useToast()

	const login = useCallback(
		(connectorID: ConnectorNames) => {
			const connector = connectorsByName[connectorID]
			if (connector) {
				activate(connector, async (error: Error) => {
					if (error instanceof UnsupportedChainIdError) {
						const hasSetup = await setupNetwork()
						if (hasSetup) {
							activate(connector)
						}
					} else {
						window.localStorage.removeItem(connectorLocalStorageKey)
						if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
							toastError('No provider was found')
						} else if (error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorWalletConnect) {
							if (connector instanceof WalletConnectConnector) {
								const walletConnector = connector as WalletConnectConnector
								walletConnector.walletConnectProvider = null
							}
							toastError('Please authorize to access your account')
						} else {
							toastError(error.message)
						}
					}
				})
			} else {
				toastError('The connector config is wrong')
			}
		},
		[activate, toastError]
	)

	const logout = useCallback(() => {
		deactivate()
		// This localStorage key is set by @web3-react/walletconnect-connector
		if (window.localStorage.getItem('walletconnect')) {
			connectorsByName.walletconnect.disconnect()
			connectorsByName.walletconnect.walletConnectProvider = null
		}
	}, [deactivate])

	return { login, logout }
}

export default useAuth
