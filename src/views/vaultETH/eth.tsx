import React, { useEffect, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useToast from 'hooks/useToast'
import { useAllVaultSBalance, useVaultSRewardBalance } from 'state/wallet/hooks'
import { getAllVaultSBalance } from 'api/getBalance'
import { getVaultSReward } from 'api/getRewards'
import { claimVaultSReward } from 'api/processRewards'

import GeneralOverview from 'components/generalOverview/generalOverview'
import BarChart from 'components/pieChart/pieChart'
import FakeVault from 'components/fakeVault/fakeVault'
import SwitchReflection from 'components/switchReflectionToken/switchReflection'
import LineChart from 'components/lineChart/lineChart'
import getPriceData from 'api/getPriceData'
import style from './eth.module.css'

function Eth() {
	const { account, library } = useActiveWeb3React()
	const signer = library.getSigner()
	const { allVaultSBalance, setAllVaultSBalance } = useAllVaultSBalance()
	const { vaultSrewardBalance, setVaultSRewardBalance } = useVaultSRewardBalance()
	const { toastSuccess, toastError } = useToast()
	const [loading, setLoading] = useState(true)
	const [total, setTotal] = useState('0')
	const [timeInterval, setTimeInterval] = useState('1H')
	const [chartDataLoading, setChartDataLoading] = useState(true)
	const [chartDataError, setChartDataError] = useState(false)

	const [vaultSData, setVaultSData] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			setAllVaultSBalance(await getAllVaultSBalance(account))
			setVaultSRewardBalance(await getVaultSReward(account))
			setLoading(false)
		}

		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account])

	const handleClaimRewards = () => {
		claimVaultSReward(signer, toastSuccess, toastError)
	}

	useEffect(() => {
		getVaultSPriceData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeInterval])

	async function getVaultSPriceData() {
		const res = await getPriceData.getVaultSPriceData(timeInterval)
		if (res.success) {
			if (res.data.length === 0) {
				setChartDataError(true)
			} else {
				setVaultSData(res.data)
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
				<div className={style.eth}>
					<div className={style.box1}>
						<header>General overview</header>
						<GeneralOverview allVaultBalance={allVaultSBalance} />
						<SwitchReflection rewardBalance={vaultSrewardBalance} showChangeRewardToken={false} showReinvestReward handleClaimRewards={handleClaimRewards} />
					</div>
					<div className={style.box2}>
						<div className={style.box2__chart}>
							<BarChart allBalance={allVaultSBalance} setTotal={setTotal} />
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
						<LineChart lineChartData={vaultSData} chartDataLoading={chartDataLoading} chartDataError={chartDataError} title='VaultS Price Movement' />
					</div>
					<div className={style.box4}>{}</div>
				</div>
			) : (
				<FakeVault />
			)}
		</div>
	)
}

export default Eth
