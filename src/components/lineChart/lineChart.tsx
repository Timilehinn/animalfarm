import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import ChartLoading from 'components/chartLoading/chartLoading'
import Error from 'components/error/error'
import { ApexOptions } from 'apexcharts'

interface lineChartProps {
	lineChartData: any
	chartDataLoading: boolean
	chartDataError: boolean
	title: string
}

function LineChart(props: lineChartProps) {
	const { lineChartData, chartDataLoading, chartDataError, title } = props

	const [series, setSeries] = useState([])

	useEffect(() => {
		setLineChartData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lineChartData, chartDataLoading])

	const setLineChartData = () => {
		setSeries([{ name: 'Price (USD)', data: lineChartData }])
	}

	const options: ApexOptions = {
		chart: {
			id: 'area-datetime',
			type: 'area',
			stacked: false,
			height: 350,
			zoom: {
				type: 'x',
				enabled: true,
				autoScaleYaxis: true,
			},
			toolbar: {
				autoSelected: 'zoom',
			},
			selection: {
				enabled: true,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
		},
		subtitle: {
			text: 'Price against Time',
			align: 'left',
		},
		yaxis: {
			labels: {
				formatter: (val) => {
					return val.toFixed(9)
				},
			},
			title: {
				text: 'Price (USD)',
			},
			tickAmount: 8,
		},
		xaxis: {
			type: 'datetime',
			labels: {
				datetimeFormatter: {
					year: 'yyyy',
					month: "MMM 'yy",
					day: 'dd MMM',
					hour: 'HH:mm',
				},
			},
			tickAmount: 6,
			title: {
				text: 'Date',
			},
		},
		grid: {
			show: false,
		},
		legend: {
			horizontalAlign: 'left',
		},
		markers: {
			size: 0,
		},
		title: {
			text: title,
			align: 'left',
		},
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				inverseColors: false,
				opacityFrom: 0.6,
				opacityTo: 0.1,
				stops: [0, 100],
			},
		},
		tooltip: {
			shared: false,
			x: {
				format: 'dd MMM yyyy',
			},
			y: {
				formatter: (value) => {
					return `$ ${value.toFixed(9)}`
				},
			},
		},
		responsive: [
			{
				breakpoint: 700,
				options: {
					yaxis: {
						show: false,
					},
				},
			},
		],
	}

	return (
		<div>
			{chartDataLoading ? (
				<div style={{ height: '100%', width: '100%', justifyContent: 'center', display: 'flex' }}>
					<ChartLoading />
				</div>
			) : chartDataError ? (
				<Error />
			) : (
				<Chart options={options} series={series} type='area' height={400} />
			)}
		</div>
	)
}

export default LineChart
