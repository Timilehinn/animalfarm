import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { usePricing } from 'state/pricing/hooks'
import styles from './SideNavigation.module.scss'
import logo from '../../assets/svgg.png'
import doglogo from '../../assets/doglogo.png'
import twitter from '../../assets/twitter.png'
import discord from '../../assets/discord.png'
import telegram from '../../assets/telegram.png'

function SideNavigation() {
	const { pigsBusdPrice } = usePricing()
	const [isSwitchActive, SetIsSwitchActive] = useState(false)
	const handleAppTour = () => {
		SetIsSwitchActive(!isSwitchActive)
		if (isSwitchActive === false) {
			localStorage.setItem('piggyBankInfo', 'piggyBankInfo')
			localStorage.setItem('pigCreditInfo', 'pigCreditInfo')
			localStorage.setItem('pigPenInfo', 'pigPenInfo')
		} else {
			localStorage.removeItem('piggyBankInfo')
			localStorage.removeItem('pigCreditInfo')
			localStorage.removeItem('pigPenInfo')
		}
	}
	useEffect(() => {
		const isAppTourActive = localStorage.getItem('piggyBankInfo')
		if (isAppTourActive) {
			SetIsSwitchActive(true)
		}
	}, [])
	return (
		<div className={styles.side}>
			<header>
				<img src={logo} alt='' />
				<h3>Animal Farm</h3>
			</header>
			<ul className={styles.ul}>
				<NavLink to='/' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='system-uicons:home-door' />
					<p>Home</p>
				</NavLink>
				<NavLink to='/pigs-credit' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='fluent:credit-card-person-20-regular' />
					<p>Pigs Credit</p>
				</NavLink>
				<NavLink to='/pigs-pen' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='mdi-light:book-multiple' />
					<p>Pig Pen</p>
				</NavLink>
				<NavLink to='/piggy-bank' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='iconoir:piggy-bank' />
					<p>Piggy Bank</p>
				</NavLink>
				<NavLink to='/swap' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='ic:outline-swap-horizontal-circle' />
					<p>Swap</p>
				</NavLink>
				<NavLink to='/add-liquidity' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='ri:refund-2-line' />
					<p>Add Liquidity</p>
				</NavLink>
				<NavLink to='/farms' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='iconoir:farm' />
					<p>Farms</p>
				</NavLink>
				<NavLink to='/pools' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='clarity:resource-pool-line' />
					<p>Pools</p>
				</NavLink>
				{/* <a className={styles.link} href='https://pancakeswap.finance/info/token/0x9a3321E1aCD3B9F6debEE5e042dD2411A1742002' target='_blank' rel='noreferrer'>
					<Icon icon='fa6-solid:money-check-dollar' />
					<p>Buy / Add Liquidity</p>
				</a> */}
				<NavLink to='/garden' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='maki:garden' />
					<p>Drip Garden</p>
				</NavLink>
				{/* <a className={styles.link} href='https://theanimal.farm/garden' target='_blank' rel='noreferrer'>
					<Icon icon='maki:garden' />
					<p>Drip Garden</p>
				</a> */}
				<a className={styles.link} href={`${window.location.origin}/docs/Animal_Farm_Rebirth_-_Migration__White_Paper_002.pdf`}>
					<Icon icon='ep:document-checked' />
					<p>Documentation</p>
				</a>
				{/* <NavLink to='/migrate' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='dashicons:migrate' />
					<p>Migrate</p>
				</NavLink> */}
				<a className={styles.link} href='https://theanimal.farm/dripliberation' target='_blank' rel='noreferrer'>
					<Icon icon='bx:bar-chart-alt-2' />
					<p>Drip Liberation</p>
				</a>
				<div className={styles.settings__wrap}>
					<div className={styles.settings}>
						<div onClick={() => handleAppTour()} className={styles.switch}>
							<div className={isSwitchActive ? `${styles.switch__button__active} ${styles.switch__button}` : `${styles.switch__button}`}>{}</div>
						</div>
						<p>App Tour</p>
					</div>
				</div>
			</ul>
			<div className={styles.side__coinprice}>
				<div className={styles.side__coinprice__in}>
					<ul>
						<li>
							<img src={logo} alt='' />
							<p>${Number(pigsBusdPrice).toFixed(2)}</p>
						</li>
						{/* <li>
							<img src={doglogo} alt='' />
							<p>$0.00</p>
						</li> */}
					</ul>
				</div>
			</div>
			<div className={styles.side__socials}>
				<a href='https://twitter.com/DRIPcommunity/' className={styles.side__socials__icon} target='_blank' rel='noreferrer'>
					<img src={twitter} alt='' />
				</a>
				<a style={{ marginRight: '20px', marginLeft: '20px' }} href={`${window.location.origin}`} className={styles.side__socials__icon}>
					<img src={discord} alt='' />
				</a>
				<a href='http://t.me/The_Animal_Farm' className={styles.side__socials__icon} target='_blank' rel='noreferrer'>
					<img src={telegram} alt='' />
				</a>
			</div>
		</div>
	)
}

export default SideNavigation
