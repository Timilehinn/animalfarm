import React from 'react'
import { useConnectWallet } from 'state/wallet/hooks'
import BigNumber from 'bignumber.js'
import './App.css'
import Dashboard from './views/dashboard/dashboard'
import Landing from './views/landing/landing'

BigNumber.config({
	EXPONENTIAL_AT: 1000,
	DECIMAL_PLACES: 80,
})

function App() {
	const { isWalletConnected } = useConnectWallet()

	return <div className='App'>{isWalletConnected ? <Dashboard /> : <Landing />}</div>
}

export default App
