import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './mobileNav.module.css'

function MobileNav() {
	return (
		<div>
			<nav className={style.mobileNav}>
				<ul>
					<NavLink className={style.link} to='/'>
						My vault
					</NavLink>
					<NavLink className={style.link} to='/vaultx'>
						Vault X
					</NavLink>
					<NavLink className={style.link} to='/vaults'>
						Vault S
					</NavLink>
				</ul>
			</nav>
		</div>
	)
}

export default MobileNav
