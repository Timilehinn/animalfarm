import React, { useState } from 'react'
import Chart from 'react-apexcharts'

function BarChart(props) {
	const series = [44, 55, 13]
	const options = {
		colors: ['#2E93fA', '#546E7A', '#FF9800'],
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
			// curve : 'stepline' i see you tried the curve here @ makinde
		},
		legend: {
			labels: {
				colors: '#fff',
			},
		},
		labels: ['Vault-X', 'Vault-S'],
	}

	return (
		<div>
			<Chart options={options} series={series} type='donut' width={300} height={200} />
		</div>
	)
}

export default BarChart
