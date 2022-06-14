import React, { useState, useEffect } from 'react'
import Farm from 'components/Farm/Farm'
import styles from './Pools.module.scss'
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
			title: 'DOG',
			pair1: dog,
			// pair2: busd,
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
			// pair2: wbnb,
			multiplier: 4,
			isCore: true,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'DOGS',
			totalLiquidity: 73362,
		},
		{
			title: 'BUSD',
			pair1: busd,
			// pair2: busd,
			multiplier: 4,
			isCore: true,
			amountStaked: 4567,
			amountEarned: 98,
			apr: 35,
			rewardToken: 'DOGS',
			totalLiquidity: 73362,
		},
		{
			title: 'ETH',
			pair1: eth,
			// pair2: busd,
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
			// pair2: busd,
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
			// pair2: busd,
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
