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
			name: 'PIGS',
			icon: pig,
		},
		{
			name: 'DOG',
			icon: dog,
		},
		{
			name:'BUSD',
			icon:busd
		}
	]

	const tokens2 = [
		{
			name: 'PIGS',
			icon: pig,
		},
		{
			name: 'DOG',
			icon: dog,
		},
		{
			name: 'BUSD',
			icon: busd,
		},
	]

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isMenuOpen2, setIsMenuOpen2] = useState(false)
	const [activeToken, setActiveToken] = useState(1)
	const [activeToken2, setActiveToken2] = useState(0)
	const [inputOne, setInputOne] = useState('')
	const [inputTwo, setInputTwo] = useState('')

	const handleMenuClick = (index: number) => {
		if(tokens[index].name===tokens2[activeToken2].name){
			return
		}
		setActiveToken(index)
		setIsMenuOpen(false)
		console.log(tokens[index])
		console.log(tokens2[activeToken2])
	}

	const handleMenuClick2 = (index: number) => {
		if (tokens2[index].name === tokens[activeToken].name) {
			return
		}
		setActiveToken2(index)
		setIsMenuOpen2(false)
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
				<div className={styles.balance}>
					<p>Available {tokens[activeToken].name} </p>
					<p>0$</p>
				</div> 
				{isMenuOpen && (
					<div className={styles.box}>
						{tokens.map((item, index) => (
							<div  onClick={() => handleMenuClick(index)} className={styles.box__item}>
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
					<div onClick={() => setIsMenuOpen2(!isMenuOpen2)} className={styles.logo}>
						<img src={tokens2[activeToken2].icon} alt='' /> 
						<p>{tokens2[activeToken2].name}</p>
					</div>
					<input min='0' required type='number' value={inputTwo} onChange={(e) => setInputTwo(e.target.value)} placeholder='0.0' />
				</div>
				<div className={styles.balance}>
					<p>Available BUSD </p>
					<p>0$</p>
				</div>
				{isMenuOpen2 && (
					<div className={styles.box}>
						{tokens2.map((item, index) => (
							<div onClick={() => handleMenuClick2(index)} className={styles.box__item}>
								<img src={item.icon} alt='' />
								<p style={{ color: 'white' }}> {item.name}</p>
							</div>
						))}
					</div>
				)}
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
					<p className={styles.price}>0%</p>
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
