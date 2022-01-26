import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import style from './sideNav.module.css'

function SideNav() {
	const location = useLocation()

	const { pathname } = location

	const splitLocation = pathname.split('/')

	return (
		<div className={style.wrap}>
			<div className={style.sidenav}>
				<ul>
					<NavLink className={splitLocation[1] === '' ? `${style.link} ${style.link__active}` : `${style.link}`} to='/'>
						My VAULT
					</NavLink>
					<NavLink className={splitLocation[1] === 'vaultx' ? `${style.link} ${style.link__active}` : `${style.link}`} to='/vaultx'>
						VAULT X
					</NavLink>
					<NavLink className={splitLocation[1] === 'vaults' ? `${style.link} ${style.link__active}` : `${style.link}`} to='/vaults'>
						VAULT <span style={{ fontSize: 15, fontWeight: 'bold' }}>S</span>
					</NavLink>
				</ul>
			</div>
		</div>
	)
}

export default SideNav
