/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import PiggyBankTable from 'components/PiggyBankTable/PiggyBankTable'
import ReferralTable from 'components/ReferralTable/ReferralTable'
import PiggyBankInfo from 'components/PiggyBankInfo/PiggyBankInfo'
import style from './PiggyBank.module.scss'

function PiggyBank() {
	return (
		<div>
			<div className={style.piggybank}>

			{/* first form here */}

			{/* second form here */}

			<PiggyBankTable />
			<ReferralTable />
			<PiggyBankInfo />
			</div>
		</div>
	)
}

export default PiggyBank
