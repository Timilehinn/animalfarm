import sample from 'lodash/sample'

export const CHAIN_ID = 56
export const NODES = {
	56: ["http://149.56.174.1:8545", "http://lotw-vm-host5.qortal.org:8545"],
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
