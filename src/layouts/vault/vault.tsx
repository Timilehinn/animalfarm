import React from 'react'
import {Route, Routes } from 'react-router-dom'
import MyVault from 'views/myVault/myVault'
import Btc from 'views/vaultBTC/btc'
import Eth from 'views/vaultETH/eth'
import style from './vault.module.css'

function Vault() {
	return (
		<div className={style.vault}>
			<Routes>
				<Route path='/' element={<MyVault />} />
				<Route path='/vaultx' element={<Btc />} />
				<Route path='/vaults' element={<Eth />} />
			</Routes>
		</div>
	)
}

export default Vault
