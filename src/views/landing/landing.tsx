import React from 'react'
import { useConnectWallet, useAllBalance, useConnectWalletModal } from 'state/wallet/hooks'
// import useActiveWeb3React from 'hooks/useActiveWeb3React'
// import { getAllBalance } from 'api/getBalance'
import useAuth from 'hooks/useAuth'
import GenericBackground from 'components/GenericBackground/GenericBackground'
import ConnectWalletModal from '../../components/ConnectWalletModal/ConnectWalletModal'
import style from './landing.module.css'

function Landing() {
	const { login } = useAuth()
	// const { account, active } = useActiveWeb3React()
	// const { setAllBalance } = useAllBalance()
	// const { setIsWalletConnected } = useConnectWallet()
	const { toggleConnectWalletModal } = useConnectWalletModal()

	// useEffect(() => {
	// 	const fetchBalance = async () => {
	// 		setAllBalance(await getAllBalance(account))
	// 	}
	// 	if (active && account) {
	// 		fetchBalance()
	// 		setIsWalletConnected(true)
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [active, account])

	const connect = () => {
		toggleConnectWalletModal(true)
	}
	return (
		<div className={style.landing}>
			{}
		</div>
	)
}

export default Landing
