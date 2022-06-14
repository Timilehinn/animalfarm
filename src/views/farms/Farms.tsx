import React, { useState, useEffect } from 'react'
import Farm from 'components/Farm/Farm'
import styles from './Farms.module.scss'
import dog from '../../assets/dogg.png'
import busd from '../../assets/bbusd.png'
import wbnb from '../../assets/wbnb.png'
import drip from '../../assets/drip.png'
import usdt from '../../assets/usdt.png'
import usdc from '../../assets/usdc.png'
import tusd from '../../assets/tusd.png'
import dai from '../../assets/dai.png'
import btcb from '../../assets/btcb.png'
import eth from '../../assets/eth.png'
import cake from '../../assets/cake.png'
import belt from '../../assets/belt.png'
import dot from '../../assets/dot.png'
import link from '../../assets/link.png'

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
			title: 'DOGS/BUSD',
			pair1: dog,
			pair2: busd,
			multiplier: 6,
			isCore: true,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'DOGS/WBNB',
			pair1: dog,
			pair2: wbnb,
			multiplier: 6,
			isCore: true,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'DRIP/BUSD',
			pair1: drip,
			pair2: busd,
			multiplier: 6,
			isCore: true,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'WBNB/BUSD',
			pair1: wbnb,
			pair2: busd,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'USDT/BUSD',
			pair1: usdt,
			pair2: busd,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'USDC/BUSD',
			pair1: dog,
			pair2: busd,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'TUSD/BUSD',
			pair1: tusd,
			pair2: busd,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'DAI/BUSD',
			pair1: dai,
			pair2: busd,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'BTCB/ETH',
			pair1: btcb,
			pair2: eth,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'ETH/WBNB',
			pair1: eth,
			pair2: wbnb,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'BTCB/WBNB',
			pair1: btcb,
			pair2: wbnb,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: '	ETH/USDC',
			pair1: eth,
			pair2: usdc,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'BTCB/BUSD',
			pair1: btcb,
			pair2: busd,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'USDT/WBNB',
			pair1: usdt,
			pair2: wbnb,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'CAKE/BUSD',
			pair1: cake,
			pair2: busd,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'CAKE/USDT',
			pair1: cake,
			pair2: usdt,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'CAKE/WBNB',
			pair1: cake,
			pair2: busd,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'BELT/WBNB',
			pair1: belt,
			pair2: wbnb,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'DOT/WBNB',
			pair1: dot,
			pair2: wbnb,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
			totalLiquidity: 73362,
		},
		{
			title: 'LINK/WBNB',
			pair1: link,
			pair2: wbnb,
			multiplier: 6,
			isCore: false,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'PIGS',
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
						pair2={item.pair2}
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
				{/* <Farm pair='DOGS/BUSD' core='core' isCollapsed={true} id={0} current={current} setCurrent={setCurrent} />
				<Farm pair='DOGS/WBNB' core='core' isCollapsed={true} id={1} current={current} setCurrent={setCurrent} />
				<Farm pair='DOGS/BUSD' core='core' isCollapsed={true} id={2} current={current} setCurrent={setCurrent} />
				<Farm pair='DOGS/WBNB' core='core' isCollapsed={true} id={3} current={current} setCurrent={setCurrent} />
				<Farm pair='DOGS/WBNB' core='core' isCollapsed={true} id={4} current={current} setCurrent={setCurrent} />
				<Farm pair='DOGS/WBNB' core='core' isCollapsed={true} id={5} current={current} setCurrent={setCurrent} />
				<Farm pair='DOGS/WBNB' core='core' isCollapsed={true} id={6} current={current} setCurrent={setCurrent} />
				<Farm pair='DOGS/WBNB' core='core' isCollapsed={true} id={7} current={current} setCurrent={setCurrent} /> */}
			</div>
		</div>
	)
}

export default Farms
