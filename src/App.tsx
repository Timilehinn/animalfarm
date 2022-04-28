import React from 'react'
import { useConnectWallet } from 'state/wallet/hooks'
import BigNumber from 'bignumber.js'
import Landing from './views/landing/landing'
import './App.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

BigNumber.config({
	EXPONENTIAL_AT: 1000,
	DECIMAL_PLACES: 80,
})

function App() {
	const { isWalletConnected } = useConnectWallet()

	return (

		<div className='App'>
			<Landing />
		</div>
	)
}

export default App
