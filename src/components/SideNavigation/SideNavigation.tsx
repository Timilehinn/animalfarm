import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Icon } from '@iconify/react'
import styles from './SideNavigation.module.scss'
import logo from '../../assets/svgg.png'
import doglogo from '../../assets/doglogo.png'
import twitter from '../../assets/twitter.png'
import discord from '../../assets/discord.png'
import telegram from '../../assets/telegram.png'
import home from '../../assets/home.png'
import shop from '../../assets/shop.png'
import book from '../../assets/book.png'

function SideNavigation() {
	return (
		<div className={styles.side}>
			<header>
				<img src={logo} alt='' />
				<h3>Animal Farm</h3>
			</header>
			<ul className={styles.ul}>
				<NavLink to='/' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='clarity:home-line' />
					<p>Home</p>
				</NavLink>
				<NavLink to='/pigs-credit' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='iconoir:small-shop' />
					<p>Pig Credit</p>
				</NavLink>
				<NavLink to='/pigs-pen' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='fluent:book-20-regular' />
					<p>Pig Pen</p>
				</NavLink>
				<NavLink to='/piggy-bank' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='iconoir:piggy-bank' />
					<p>Piggy Bank</p>
				</NavLink>
				<a className={styles.link} href='https://theanimal.farm/garden'>
					<Icon icon='maki:garden' />
					<p>Drip Garden</p>
				</a>
				<a className={styles.link} href={`${window.location.origin}/docs/Animal_Farm_Rebirth_-_Migration__White_Paper_002.pdf`}>
					<Icon icon='ep:document-checked' />
					<p>Documentation</p>
				</a>
				<NavLink to='/migrate' className={(navData) => (navData.isActive ? `${styles.link__active} ${styles.link}` : styles.link)}>
					<Icon icon='iconoir:piggy-bank' />
					<p>Migrate</p>
				</NavLink>
				<a className={styles.link} href="https://theanimal.farm/dripliberation">
					<Icon icon="bx:bar-chart-alt-2" />
					<p>Drip Liberation</p>
				</a>
			</ul>
			<div className={styles.side__coinprice}>
				<div className={styles.side__coinprice__in}>
					<ul>
						<li>
							<img src={logo} alt='' />
							<p>$0.00</p>
						</li>
						<li>
							<img src={doglogo} alt='' />
							<p>$0.00</p>
						</li>
					</ul>
				</div>
			</div>
			<div className={styles.side__socials}>
				<a href={`${window.location.origin}`} className={styles.side__socials__icon}>
					<img src={twitter} alt='' />
				</a>
				<a style={{ marginRight: '20px', marginLeft: '20px' }} href={`${window.location.origin}`} className={styles.side__socials__icon}>
					<img src={discord} alt='' />
				</a>
				<a href={`${window.location.origin}`} className={styles.side__socials__icon}>
					<img src={telegram} alt='' />
				</a>
			</div>
		</div>
	)
}

export default SideNavigation
