import React, { useState, useEffect } from 'react'
import Farm from 'components/Farm/Farm'
import styles from './Pools.module.scss'
import dog from '../../assets/dogg.png'
import busd from '../../assets/bbusd.png'
import wbnb from '../../assets/wbnb.png'
import btcb from '../../assets/btcb.png'
import eth from '../../assets/eth.png'
import cake from '../../assets/cake.png'

function Farms() {
	useEffect(() => {
		document.body.setAttribute(
			'style',
			`
		background-image: url(${window.location.origin}/bg/piggybank.png);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-color: rgb(24, 24, 24);`
		)
	}, [])

	const [current, setCurrent] = useState(null)

	const data = [
		{
			title: 'DOGS',
			pair1: dog,
			multiplier: 0,
			isCore: true,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'WBNB',
			pair1: wbnb,
			multiplier: 4,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'DOGS',
			totalLiquidity: 73362,
		},
		{
			title: 'BUSD',
			pair1: busd,
			multiplier: 4,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'DOGS',
			totalLiquidity: 73362,
		},
		{
			title: 'ETH',
			pair1: eth,
			multiplier: 4,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'DOGS',
			totalLiquidity: 73362,
		},
		{
			title: 'CAKE',
			pair1: cake,
			multiplier: 4,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'DOGS',
			totalLiquidity: 73362,
		},
		{
			title: 'BTCB',
			pair1: btcb,
			multiplier: 4,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'DOGS',
			totalLiquidity: 73362,
		},
	]

	return (
		<div className={styles.farms__wrap}>
			<div className={styles.farms}>
				{data.map((item, index) => (
					<Farm
						title={item.title}
						core={item.isCore}
						pair1={item.pair1}
						// pair2={item.pair2}
						multiplier={item.multiplier}
						amountStaked={item.amountStaked}
						amountEarned={item.amountEarned}
						apr={item.apr}
						id={index}
						current={current}
						rewardToken={item.rewardToken}
						setCurrent={setCurrent}
						totalLiquidity={item.totalLiquidity}
					/>
				))}
			</div>
		</div>
	)
}

export default Farms
