// eslint-disable-next-line
import React, { useEffect, useState } from 'react'

// import type { Balance } from 'state/wallet'
import GeneralOverview from 'components/generalOverview/generalOverview'
import BarChart from 'components/pieChart/pieChart'
import LineChart from 'components/lineChart/lineChart'
import { getData } from 'api/dummyApi'
import { useAllBalance } from 'state/wallet/hooks'
import FakeVault from 'components/fakeVault/fakeVault'
import Jaquar from 'components/JaquarWid/jaguarWidget'
import getPriceData from 'api/getPriceData'
import style from './myVault.module.css'
import dropdown from '../../assets/img/dropdown.png'
import arrowUp from '../../assets/img/arrowUp.png'

function MyVault() {
	const { allBalance } = useAllBalance()
	const [loading, setLoading] = useState(true)
	const [total, setTotal] = useState('0')
	const [timeInterval, setTimeInterval] = useState('1H')
	const [chartDataLoading, setChartDataLoading] = useState(true)
	const [chartDataError, setChartDataError] = useState(false)
	const [vaultXData, setVaultXData] = useState([])
	const [myVault, setMyVault] = useState(false)
	const [menu, setMenu] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			getVaultData()
			setLoading(false)
		}, 1000)
	}, [])

	function getVaultData() {
		return getData.get()
	}

	// vaultX
	useEffect(() => {
		getMyVaultPriceData()
		// eslint-disable-next-line
	}, [timeInterval, myVault])

	async function getMyVaultPriceData() {
		const res = myVault ? await getPriceData.getVaultXPriceData(timeInterval) : await getPriceData.getVaultSPriceData(timeInterval)
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
		<div onKeyDown={() => setMenu(false)} role='button' tabIndex={0} onClick={() => (menu ? setMenu(!menu) : '')}>
			{!loading ? (
				<div className={style.myVault}>
					<div className={style.box1}>
						<header>General overview</header>
						<GeneralOverview allVaultBalance={allBalance} />
						<Jaquar />
					</div>
					<div className={style.box2}>
						<div className={style.box2__chart}>
							<BarChart allBalance={allBalance} setTotal={setTotal} />
						</div>

						<div className={style.overall}>
							<p>Overall Vault Assets</p>
							<h3>${total}</h3>
						</div>
					</div>
					<div className={style.box3}>
						<nav className={style.box3__nav}>
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
								</select>
							</div>
							<div onKeyDown={() => setMenu(!menu)} role='button' tabIndex={0} onClick={() => setMenu(!menu)} className={style.menu}>
								<p>{myVault ? 'VaultX' : 'VaultS'} </p>
								<img src={menu ? arrowUp : dropdown} alt='' />
							</div>
							<div className={menu ? `${style.menu__items} ${style.menu__items__active}` : `${style.menu__items}`}>
								<button
									type='button'
									onClick={() => {
										setMyVault(true)
										if (!myVault) {
											setChartDataLoading(true)
										}
									}}
								>
									VAULT-X
								</button>
								<button
									type='button'
									onClick={() => {
										setMyVault(false)
										if (myVault) {
											setChartDataLoading(true)
										}
									}}
								>
									VAULT-S
								</button>
							</div>
						</nav>
						<LineChart lineChartData={vaultXData} chartDataLoading={chartDataLoading} chartDataError={chartDataError} title={myVault ? 'VAULT-X Price Movement' : 'VAULT-S Price Movement'} />
					</div>
					<div className={style.box4}>{}</div>
				</div>
			) : (
				<FakeVault />
			)}
		</div>
	)
}

export default MyVault
