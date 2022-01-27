import { Config, ConnectorNames } from './types'

import Metamask from './Icons/Metamask.svg'
import WalletConnect from './Icons/WalletConnect.svg'
import TrustWallet from './Icons/TrustWallet.svg'
import MathWallet from './Icons/MathWallet.svg'
import TokenPocket from './Icons/TokenPocket.svg'
import BinanceChain from './Icons/BinanceChain.svg'
import SafePal from './Icons/SafePal.svg'
import Coin98 from './Icons/Coin98.svg'

const connectors: Config[] = [
	{
		title: 'Metamask',
		icon: Metamask,
		connectorId: ConnectorNames.Injected,
		priority: 1,
	},
	{
		title: 'WalletConnect',
		icon: WalletConnect,
		connectorId: ConnectorNames.WalletConnect,
		priority: 2,
	},
	{
		title: 'Trust Wallet',
		icon: TrustWallet,
		connectorId: ConnectorNames.Injected,
		priority: 3,
	},
	{
		title: 'MathWallet',
		icon: MathWallet,
		connectorId: ConnectorNames.Injected,
		priority: 999,
	},
	{
		title: 'TokenPocket',
		icon: TokenPocket,
		connectorId: ConnectorNames.Injected,
		priority: 999,
	},

	{
		title: 'Binance Chain',
		icon: BinanceChain,
		connectorId: ConnectorNames.BSC,
		priority: 999,
	},
	{
		title: 'SafePal',
		icon: SafePal,
		connectorId: ConnectorNames.Injected,
		priority: 999,
	},
	{
		title: 'Coin98',
		icon: Coin98,
		connectorId: ConnectorNames.Injected,
		priority: 999,
	},
]

export default connectors
export const connectorLocalStorageKey = 'connectorIdv2'
export const walletLocalStorageKey = 'wallet'
