/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useAuth from 'hooks/useAuth'
import { useConnectWallet } from 'state/wallet/hooks'

import logo from '../../assets/img/-5080552570497378811_121.jpg'
import style from './nav.module.css'
import dot from '../../assets/img/ecllipse.png'
import arrowDown from '../../assets/img/arrowDown.png'
import logoutImg from '../../assets/img/logout.png'
import menu from '../../assets/img/menu-1.png'

function Nav() {
	const { account } = useActiveWeb3React()
	const { logout } = useAuth()
	const { setIsWalletConnected } = useConnectWallet()
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate(`/`)
		setIsWalletConnected(false)
	}

	return (
		<div>
			<nav className={style.nav}>
				<div className={style.menu}>
					<img src={menu} alt='' />
				</div>
				<ul className={style.nav__ul1}>
					<li>
						<p className={style.logo}>Portfolio Manager{}</p>
						<div className={style.border}>
							<div className={style.bottom}></div>
						</div>
					</li>
					<li>
						<p className={style.swap}>Swap</p>
					</li>
				</ul>
				<ul className={style.nav__ul2}>
					<li>
						<img src={logo} alt='' />
					</li>
				</ul>
				<ul className={style.nav__ul3}>
					<li className={style.wallet}>
						<img src={dot} alt='' />
						<p style={{ fontSize: '12px', opacity: '87%' }}>{account ? account.substring(0, 6) : ''}...{account ? account.substring(account.length - 4) : ''}</p>
						<img src={arrowDown} alt='' />
						<div className={style.dropDown} onClick={handleLogout}>
							<p>Disconnect</p>
							<img src={logoutImg} alt='' />
						</div>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Nav
