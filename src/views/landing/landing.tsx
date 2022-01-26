import React, { useEffect } from 'react'
import { useConnectWallet, useAllBalance, useConnectWalletModal } from 'state/wallet/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getAllBalance } from 'api/getBalance'
import useAuth from 'hooks/useAuth'
import Background from 'components/background/background'
import { getVaultXPrice } from 'utils/getPrice'
import ConnectWallet from '../../components/modals/connectWallet/connectWalletModal'
import style from './landing.module.css'
import logo from '../../assets/img/-5080552570497378811_121.jpg'
import vaultx from '../../assets/img/vaults.png'
import vaults from '../../assets/img/vaultx.png'

function Landing() {
	const { login } = useAuth()
	const { account, active } = useActiveWeb3React()
	const { setAllBalance } = useAllBalance()
	const { setIsWalletConnected } = useConnectWallet()
	const { toggleConnectWalletModal } = useConnectWalletModal()

	getVaultXPrice()

	useEffect(() => {
		const fetchBalance = async () => {
			setAllBalance(await getAllBalance(account))
		}
		if (active && account) {
			fetchBalance()
			setIsWalletConnected(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active, account])

	const connect = () => {
		toggleConnectWalletModal(true)
	}
	return (
		<div className={style.landing}>
			<header>
				<img src={logo} alt='' />
			</header>
			<div className={style.landing__main}>
				<h3>
					Manage and Keep Track <br /> of your Vault Tokens{' '}
				</h3>
				<div className={style.icons}>
					<img src={vaults} alt='' />
					<img src={vaultx} alt='' />
				</div>
				<button type='button' onClick={connect}>
					Connect Wallet
				</button>
			</div>
			<ConnectWallet login={login} />
			<Background />
		</div>
	)
}

export default Landing
