import React from 'react'
import { useAppSelector } from 'state/hooks'
import ReferralRow from 'components/ReferralRow/ReferralRow'
import style from './ReferralTable.module.scss'

function ReferralTable() {
	const piggyBankData = useAppSelector((state) => state.piggyBankReducer.data)
	const refdata = []

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
						{piggyBankData.userData.referrals.map((data, index) => (
							<ReferralRow key={`${data.timestamp}`} id={index} address={data.referral} amount={data.amount} date={data.timestamp} locktime={data.lockDuration} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ReferralTable
