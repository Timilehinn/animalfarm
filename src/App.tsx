import React from 'react'
import { useConnectWallet } from 'state/wallet/hooks'
import BigNumber from 'bignumber.js'
import './App.css'


BigNumber.config({
	EXPONENTIAL_AT: 1000,
	DECIMAL_PLACES: 80,
})

function App() {
	const { isWalletConnected } = useConnectWallet()

	return <div className='App'>Drip</div>
}

export default App
