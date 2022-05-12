import sample from 'lodash/sample'

export const CHAIN_ID = 56
export const NODES = {
	56: ['https://bsc-dataseed.binance.org', 'https://bsc-dataseed1.defibit.io', 'https://speedy-nodes-nyc.moralis.io/480f9fd047ed15e4229e4547/bsc/mainnet/archive'],
	97: [
		'https://speedy-nodes-nyc.moralis.io/480f9fd047ed15e4229e4547/bsc/testnet/archive',
		'https://speedy-nodes-nyc.moralis.io/480f9fd047ed15e4229e4547/bsc/testnet/archive',
		'https://speedy-nodes-nyc.moralis.io/480f9fd047ed15e4229e4547/bsc/testnet/archive',
	],
}

const getNodeUrl = (): string => {
	const nodeUrl = sample(NODES[CHAIN_ID])
	if (nodeUrl === undefined) {
		return NODES[CHAIN_ID][0]
	}
	return nodeUrl
}

export default getNodeUrl
