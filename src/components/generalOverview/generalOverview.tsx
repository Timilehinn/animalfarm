import React from 'react'
import BigNumber from 'bignumber.js'
import type { Balance } from 'state/wallet'
import style from './generalOverview.module.css'
import Transactions from '../transactions/transactions'

interface generalOverview {
	allVaultBalance: Balance[]
}

function GeneralOverview(props: generalOverview) {
	const { allVaultBalance } = props

	const getTotal = () => {
		let total = 0
		for (let i = 0; i < allVaultBalance.length; i++) {
			total += allVaultBalance[i].value
		}
		return new BigNumber(total).toFormat(2)
	}
	return (
		<div>
			<div className={style.general}>
				<nav>
					<ul>
						<li>Token</li>
						<li>Holdings</li>
						<li>Value</li>
					</ul>
				</nav>
				{allVaultBalance.map((vaultBalance, index) => (
					<Transactions name={vaultBalance.token.name} valueString={vaultBalance.valueString} amountString={vaultBalance.amountString} key={vaultBalance.token.symbol.concat(String(index))} />
				))}
				<div className={style.total}>
					<div className={style.total__inner}>
						<p>Total</p>
						<p>${getTotal()}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GeneralOverview
