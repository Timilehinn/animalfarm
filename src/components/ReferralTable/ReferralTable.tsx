import React from 'react'
import ReferralRow from 'components/ReferralRow/ReferralRow'
import style from './ReferralTable.module.scss'

function ReferralTable() {
	const refdata = [
		// {
		// 	id: 1,
		// 	address: '0xF0AF6F6e222d9ab9629cF0AD894C740FA3010A53',
		// 	amount: 1234567,
		// 	date: 12345678,
		// 	locktime: 749248989,
		// },
		// {
		//     id: 2,
		//     address: "0xF0AF6F6e222d9ab9629cF0AD894C740FA3010A53",
		//     amount: 1234567,
		//     date: 12345678,
		//     locktime: 749248989
		// },
		// {
		//     id: 3,
		//     address: "0xF0AF6F6e222d9ab9629cF0AD894C740FA3010A53",
		//     amount: 1234567,
		//     date: 12345678,
		//     locktime: 749248989
		// }
	]

	return (
		<div>
			<div className={style.tableheader}>
				<h4>
					My Referrals <span className={style.totalpiggybank}> {refdata.length}</span>
				</h4>
			</div>
			<div className={style.tablebody}>
				<table className={style.table}>
					<thead>
						<tr>
							<th>S/N</th>
							<th>Address</th>
							<th>Amount(LP)</th>
							<th>Date</th>
							<th>Lock Duration</th>
						</tr>
					</thead>
					<tbody>
						{refdata.map((data) => (
							<ReferralRow id={data.id} address={data.address} amount={data.amount} date={data.date} locktime={data.locktime} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ReferralTable
