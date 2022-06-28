import { ChainId, Token } from '@pancakeswap/sdk'
import { AnimalFarmTokens } from './animalFarmToken'

export const pL2Token = '0x820ad100BeFE8A31C96098Db23B1a0FA1b3f0Ab4'

export const CAKE: { [chainId: number]: Token } = {
	[ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', 18, 'CAKE', 'PancakeSwap Token'),
	[ChainId.TESTNET]: new Token(ChainId.TESTNET, '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe', 18, 'CAKE', 'PancakeSwap Token'),
}
export const BUSD: { [chainId: number]: Token } = {
	[ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'BUSD', 'Binance USD'),
	[ChainId.TESTNET]: new Token(ChainId.TESTNET, '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee', 18, 'BUSD', 'Binance USD'),
}

export const BUSD_FINAL = new Token(ChainId.MAINNET, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'BUSD', 'Binance USD')
export const WBNB = new Token(ChainId.MAINNET, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB')
export const DAI = new Token(ChainId.MAINNET, '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', 18, 'DAI', 'Dai Stablecoin')
export const USDT = new Token(ChainId.MAINNET, '0x55d398326f99059fF775485246999027B3197955', 18, 'USDT', 'Tether USD')
export const BTCB = new Token(ChainId.MAINNET, '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18, 'BTCB', 'Binance BTC')
export const UST = new Token(ChainId.MAINNET, '0x23396cF899Ca06c4472205fC903bDB4de249D6fC', 18, 'UST', 'Wrapped UST Token')
export const ETH = new Token(ChainId.MAINNET, '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', 18, 'ETH', 'Binance-Peg Ethereum Token')
export const USDC = new Token(ChainId.MAINNET, '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', 18, 'USDC', 'Binance-Peg USD Coin')

const tokens = {
	bnb: {
		symbol: 'BNB',
		projectLink: 'https://www.binance.com/',
	},
	cake: {
		symbol: 'CAKE',
		address: {
			56: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
			97: '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
		},
		decimals: 18,
		projectLink: 'https://pancakeswap.finance/',
	},
	pL2: {
		symbol: 'pL2',
		address: {
			56: pL2Token,
			97: '',
		},
		decimals: 18,
		projectLink: 'https://pancakeswap.finance/',
	},
	pigs: {
		symbol: 'PIGS',
		address: {
			56: AnimalFarmTokens.pigsToken.address,
			97: '',
		},
		decimals: 18,
		projectLink: 'https://pancakeswap.finance/',
	},
	dogs: {
		symbol: 'DOGS',
		address: {
			56: AnimalFarmTokens.dogsToken.address,
			97: '',
		},
		decimals: 18,
		projectLink: 'https://pancakeswap.finance/',
	},
	drip: {
		symbol: 'DRIP',
		address: {
			56: '0x20f663cea80face82acdfa3aae6862d246ce0333',
			97: '',
		},
		decimals: 18,
		projectLink: 'https://drip.community/',
	},
	dripBusdLp: {
		symbol: 'DRIP/BUSD LP',
		address: {
			56: '0xa0feB3c81A36E885B6608DF7f0ff69dB97491b58',
			97: '',
		},
		decimals: 18,
		projectLink: 'https://drip.community/',
	},
	pigsBusdLp: {
		symbol: 'PIGS/BUSD LP',
		address: {
			56: '0xba6418100dB9B93356bFB6A472411FDCfa2e4141',
			97: '',
		},
		decimals: 18,
		projectLink: 'https://theanimal.farm/',
	},
	belt: {
		symbol: 'BELT',
		address: {
			56: '0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f',
			97: '',
		},
		decimals: 18,
		projectLink: 'https://beta.belt.fi/',
	},
	ust: {
		symbol: 'UST',
		address: {
			56: '0x23396cf899ca06c4472205fc903bdb4de249d6fc',
			97: '',
		},
		decimals: 18,
		projectLink: 'https://mirror.finance/',
	},

	vai: {
		symbol: 'VAI',
		address: {
			56: '0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7',
			97: '',
		},
		decimals: 18,
		projectLink: 'https://venus.io/',
	},
	wbnb: {
		symbol: 'wBNB',
		address: {
			56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
			97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
		},
		decimals: 18,
		projectLink: 'https://pancakeswap.finance/',
	},

	busd: {
		symbol: 'BUSD',
		address: {
			56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
			97: '',
		},
		decimals: 18,
		projectLink: 'https://www.paxos.com/busd/',
	},
	eth: {
		symbol: 'ETH',
		address: {
			56: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
			97: '',
		},
		decimals: 18,
		projectLink: 'https://ethereum.org/en/',
	},
	beth: {
		symbol: 'BETH',
		address: {
			56: '0x250632378E573c6Be1AC2f97Fcdf00515d0Aa91B',
			97: '',
		},
		decimals: 18,
		projectLink: 'https://ethereum.org/en/eth2/beacon-chain/',
	},
	usdc: {
		symbol: 'USDC',
		address: {
			56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
			97: '',
		},
		decimals: 18,
		projectLink: 'https://www.centre.io/usdc',
	},
	dai: {
		symbol: 'DAI',
		address: {
			56: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
			97: '',
		},
		decimals: 18,
		projectLink: 'https://www.makerdao.com/',
	},
	band: {
		symbol: 'BAND',
		address: {
			56: '0xAD6cAEb32CD2c308980a548bD0Bc5AA4306c6c18',
			97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
		},
		decimals: 18,
		projectLink: 'https://bandprotocol.com/',
	},
	dot: {
		symbol: 'DOT',
		address: {
			56: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
			97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
		},
		decimals: 18,
		projectLink: 'https://polkadot.network/',
	},
	link: {
		symbol: 'LINK',
		address: {
			56: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
			97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
		},
		decimals: 18,
		projectLink: 'https://chain.link/',
	},
	usdt: {
		symbol: 'USDT',
		address: {
			56: '0x55d398326f99059fF775485246999027B3197955',
			97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
		},
		decimals: 18,
		projectLink: 'https://tether.to/',
	},
	btcb: {
		symbol: 'BTCB',
		address: {
			56: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
			97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
		},
		decimals: 18,
		projectLink: 'https://bitcoin.org/',
	},

	qsd: {
		symbol: 'QSD',
		address: {
			56: '0x07AaA29E63FFEB2EBf59B33eE61437E1a91A3bb2',
			97: '',
		},
		decimals: 18,
		projectLink: 'https://chemix.io/home',
	},
	tusd: {
		symbol: 'TUSD',
		address: {
			56: '0x14016E85a25aeb13065688cAFB43044C2ef86784',
			97: '',
		},
		decimals: 18,
		projectLink: 'https://www.trueusd.com/',
	},
	qkc: {
		symbol: 'QKC',
		address: {
			56: '0xA1434F1FC3F437fa33F7a781E041961C0205B5Da',
			97: '',
		},
		decimals: 18,
		projectLink: 'https://quarkchain.io/',
	},
}

export default tokens
