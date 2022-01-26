import { useEffect, useState, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { staticRpcProvider } from 'utils/providers'
// eslint-disable-next-line import/no-unresolved
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { CHAIN_ID } from 'utils/getRpcUrl'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
	const { library, chainId, ...web3React } = useWeb3React()
	const refEth = useRef(library)
	const [provider, setprovider] = useState(library || staticRpcProvider)

	useEffect(() => {
		if (library !== refEth.current) {
			setprovider(library || staticRpcProvider)
			refEth.current = library
		}
	}, [library])

	return { library: provider, chainId: chainId ?? CHAIN_ID, ...web3React }
}

export default useActiveWeb3React
