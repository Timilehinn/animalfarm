import sample from 'lodash/sample'

export const CHAIN_ID = 516
export const NODES = {
	516: ['https://f844-149-56-174-1.ngrok.io'], // ['https://d2e1-149-56-174-1.ngrok.io/'], // TODO: Change when going live
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
