import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import BigNumber from 'bignumber.js'
import type { Balance } from 'state/wallet'
import { abbreviateNumber } from 'utils/numberCurrencyFormatter'
import { ApexOptions } from 'apexcharts'

interface Props {
	allBalance: Balance[]
	setTotal: (total: string) => void
}

function BarChart(props: Props) {
	const { allBalance, setTotal } = props
	const [series, setSeries] = useState<ApexAxisChartSeries>([])

	useEffect(() => {
		getVaultData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allBalance])

	const [options, setOptions] = useState<ApexOptions>({
		plotOptions: {
			pie: {
				customScale: 1.04,
				dataLabels: {},
				donut: {
					size: '83%',
					background: '#0D0D0C',
					labels: {
						show: true,
						name: {
							show: true,
							fontSize: '22px',
							fontWeight: 600,
							color: 'rgba(252, 252, 252, 0.87)',
							offsetY: -5,
							formatter: (value) => {
								return value
							},
						},
						value: {
							show: true,
							fontSize: '22px',
							fontWeight: 400,
							color: 'rgba(252, 252, 252, 0.87)',
							offsetY: 5,
							formatter: (value) => {
								return value
							},
						},
						total: {
							show: true,
							showAlways: true,
							label: 'Total Value',
							fontSize: '12px',
							fontWeight: 600,
							color: 'rgba(252, 252, 252, 0.6)',
							formatter: (w) => {
								const totalValue: number = w.globals.seriesTotals.reduce((a, b) => {
									return a + b
								}, 0)
								return `$ ${abbreviateNumber(totalValue.toFixed(2))}`
							},
						},
					},
				},
			},
		},
		dataLabels: {
			enabled: false,
			formatter: (value) => {
				return `$ ${value}`
			},
		},
		colors: ['#FF5810', '#7BD607', '#CA32FF', '#13DFEC', '#0029FF', '#787B86'],
		fill: {
			pattern: {
				style: 'verticalLines',
				width: 6,
				height: 6,
				strokeWidth: 0,
			},
		},
		stroke: {
			show: false,
			// curve : 'stepline'
		},
		legend: {
			labels: {
				colors: '#fff',
			},
		},
		labels: [],
	})

	// call getData
	function getVaultData() {
		let total = 0
		const labels = []
		const _series = []
		for (let i = 0; i < allBalance.length; i++) {
			labels.push(allBalance[i].token.symbol)
			_series.push(parseFloat(allBalance[i].value.toFixed(2)))
			total += allBalance[i].value
		}
		setTotal(new BigNumber(total).toFormat(2))
		setSeries(_series)
		setOptions({ ...options, labels })
	}

	return (
		<div>
			<Chart options={options} series={series} type='donut' width={300} height={200} />
		</div>
	)
}

export default BarChart
