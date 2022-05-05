import React from 'react'
import { usePiggyBank } from 'state/piggybank/hooks'
import PiggyBankRow from 'components/PiggyBankRow/PiggyBankRow'
import style from './PiggyBankTable.module.scss'


function ReferralTable() {
	
	const { piggybank } = usePiggyBank()

	return (
		<div>
			<div className={style.tableheader}>
				<h4>
					My Piggybanks <span className={style.totalpiggybank}> {piggybank?.userData?.userPiggyBanks.length}</span>
				</h4>
			</div>
			<div className={style.tablebody}>
				<table className={style.table}>
					<thead>
						<tr>
							<th>S/N</th>
							<th>Piglets</th>
							<th>Truffles available</th>
							<th>Truffles value</th>
							<th>Time remaining</th>
							<th>Max payout</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{piggybank.userData.userPiggyBanks.map((item, index) => (
							<PiggyBankRow id={item.ID} piglets={item.hatcheryPiglets} trufflesavailable={item.availableTruffles} truffleLocker={item.truffleLocker} trufflesvalue={item.usdValue} time={item.timeLeftSinceLock} maxpayout={item.trufflesUsed} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ReferralTable
