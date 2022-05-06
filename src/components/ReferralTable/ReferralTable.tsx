import React from 'react'
import { useAppSelector } from 'state/hooks'
import ReferralRow from 'components/ReferralRow/ReferralRow'
import style from './ReferralTable.module.scss'


function ReferralTable() {
	const piggyBankData = useAppSelector((state)=>state.piggyBankReducer.data)
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
						{piggyBankData.userData.referrals.map((data,index) => (
							<ReferralRow id={index}  address={data.referral} amount={data.amount} date={data.timestamp} locktime={data.lockDuration} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ReferralTable
