import React, { useState } from 'react'
import Info from 'components/Info/Info'
import styles from './Swap.module.scss'
import dog from '../../assets/dogg.png'
import busd from '../../assets/busd.png'
import coree from '../../assets/core.png'
import swap from '../../assets/swap.png'
import arrow from '../../assets/arrow-down.png'
import pig from '../../assets/svgg.png'

interface farmProps {
	pair: string
	core: string
}

function Swap() {
	const tokens = [
		{
			name: 'PIG',
			icon: pig,
		},
		{
			name: 'DOG',
			icon: dog,
		},
	]

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [activeToken, setActiveToken] = useState(0)
	const [inputOne, setInputOne] = useState('')
	const [inputTwo, setInputTwo] = useState('')

	const handleMenuClick = (index:number) => {
	  setActiveToken(index)
	   setIsMenuOpen(false)
	}

	return (
		<div className={styles.farm}>
			<div className={styles.inputBox}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.logo}>
						<img src={tokens[activeToken].icon} alt='' />
						<p>{tokens[activeToken].name}</p>
						<img id={styles.dropdown} src={arrow} alt='' />
					</div>
					<input min='0' required type='number' value={inputOne} onChange={(e) => setInputOne(e.target.value)} placeholder='0.0' />
				</div>
				{isMenuOpen && (
					<div className={styles.box}>
						{tokens.map((item, index) => (
							<div onClick={() => handleMenuClick(index)} className={styles.box__item}>
								<img src={item.icon} alt='' />
								<p style={{ color: 'white' }}> {item.name}</p>
							</div>
						))}
					</div>
				)}
			</div>
			<div className={styles.swapIcon}>
				<img src={swap} alt='' />
			</div>

			<div className={styles.inputBox}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div className={styles.logo}>
						<img src={busd} alt='' />
						<p>BUSD</p>
					</div>
					<input min='0' required type='number' value={inputTwo} onChange={(e) => setInputTwo(e.target.value)} placeholder='0.0' />
				</div>
			</div>
			<div className={styles.slippage}>
				<p>Slippage settings</p>
				<div className={styles.slippage__buttons}>
					<button type='button' className={styles.active}>
						1%
					</button>
					<button type='button' className={styles.active}>
						5%
					</button>
					<button className={styles.active} type='button'>
						10%
					</button>
					<input className={styles.active} min='0' max='100' required type='number' placeholder='0.0' />
				</div>
				<div className={styles.tolerance}>
					<p>Slippage tolerance</p>
					<p className={styles.price}>90%</p>
				</div>
			</div>
			{/* buttons */}
			<div className={styles.buttons}>
				<button type='button'>Enter Amount</button>
			</div>
		</div>
	)
}

export default Swap
