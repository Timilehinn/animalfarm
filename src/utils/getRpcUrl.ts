import sample from 'lodash/sample'

export const CHAIN_ID = 56
export const NODES = {
	56: ['https://speedy-nodes-nyc.moralis.io/fbb4b2b82993bf507eaaab13/bsc/mainnet', 'https://speedy-nodes-nyc.moralis.io/2c4732e32c4a0b62de5cd332/bsc/mainnet'],
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
