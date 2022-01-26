/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useToast from 'hooks/useToast'
import { useAllVaultXBalance, useVaultXRewardBalance } from 'state/wallet/hooks'
import { getAllVaultXBalance } from 'api/getBalance'
import { getVaultXReward } from 'api/getRewards'
import { claimVaultXReward } from 'api/processRewards'

import GeneralOverview from 'components/generalOverview/generalOverview'
import BarChart from 'components/pieChart/pieChart'
import FakeVault from 'components/fakeVault/fakeVault'
import SwitchReflection from 'components/switchReflectionToken/switchReflection'
import LineChart from 'components/lineChart/lineChart'
import getPriceData from 'api/getPriceData'

import style from './btc.module.css'

function Btc() {
	const { account, library } = useActiveWeb3React()
	const signer = library.getSigner()
	const { allVaultXBalance, setAllVaultXBalance } = useAllVaultXBalance()
	const { vaultXrewardBalance, setVaultXRewardBalance } = useVaultXRewardBalance()
	const { toastSuccess, toastError } = useToast()
	const [loading, setLoading] = useState(true)
	const [total, setTotal] = useState('0')
	const [timeInterval, setTimeInterval] = useState('1H')
	const [chartDataLoading, setChartDataLoading] = useState(true)
	const [chartDataError, setChartDataError] = useState(false)

	const [vaultXData, setVaultXData] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			setAllVaultXBalance(await getAllVaultXBalance(account))
			setVaultXRewardBalance(await getVaultXReward(account))
			setLoading(false)
		}

		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account])

	const handleClaimRewards = () => {
		claimVaultXReward(signer, toastSuccess, toastError)
	}

	useEffect(() => {
		getVaultXPriceData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeInterval])

	async function getVaultXPriceData() {
		const res = await getPriceData.getVaultXPriceData(timeInterval)
		if (res.success) {
			if (res.data.length === 0) {
				setChartDataError(true)
			} else {
				setVaultXData(res.data)
				setChartDataError(false)
			}
			setChartDataLoading(false)
		} else {
			setChartDataLoading(false)
			setChartDataError(true)
		}
	}

	function getInterVal(e) {
		setChartDataLoading(true)
		setTimeInterval(e.target.value)
	}

	return (
		<div>
			{!loading ? (
				<div className={style.btc}>
					<div className={style.box1}>
						<header>General overview</header>
						<GeneralOverview allVaultBalance={allVaultXBalance} />
						<SwitchReflection rewardBalance={vaultXrewardBalance} showChangeRewardToken handleClaimRewards={handleClaimRewards} />
					</div>
					<div className={style.box2}>
						<div className={style.box2__chart}>
							<BarChart allBalance={allVaultXBalance} setTotal={setTotal} />
						</div>

						<div className={style.overall}>
							<p>Overall Vault Assets</p>
							<h3>${total}</h3>
						</div>
					</div>
					<div className={style.box3}>
						<div className={style.select}>
							<select onChange={getInterVal} value={timeInterval} name='' id=''>
								<option value='1'>1m</option>
								<option value='5'>5m</option>
								<option value='10'>10m</option>
								<option value='15'>15m</option>
								<option value='30'>30m</option>
								<option value='1H'>1hr</option>
								<option value='1D'>1d</option>
								<option value='1W'>1w</option>
								<option value='1M'>1m</option>
								{/* <option value="10">1hr</option> */}
							</select>
						</div>
						<LineChart lineChartData={vaultXData} chartDataLoading={chartDataLoading} chartDataError={chartDataError} title='VaultX Price Movement' />
					</div>
					<div className={style.box4}>{}</div>
				</div>
			) : (
				<FakeVault />
			)}
		</div>
	)
}

export default Btc
