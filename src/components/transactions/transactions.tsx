import React from 'react'
import style from './transactions.module.css'

interface transaction {
	name: string
	amountString: string
	valueString: string
}

function Transactions(props: transaction) {
	const { name, amountString, valueString } = props
	return (
		<div className={style.transaction}>
			<div>
				<ul>
					<li>
						<p>{name}</p>
					</li>
					<li>
						<p>{amountString}</p>
					</li>
					<li>
						<p>${valueString}</p>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Transactions
