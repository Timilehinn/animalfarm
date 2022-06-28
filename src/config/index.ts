import BigNumber from 'bignumber.js'

export const BSC_BLOCK_TIME = 3
export const BASE_URL = 'http://localhost:3000'
export const BASE_BSC_SCAN_URL = 'https://bscscan.com'
export const BASE_API = 'https://jaguar-backend-service.herokuapp.com/v1/chart/pricemovement'
export const DEFAULT_GAS_LIMIT = 2000000
export const PANCAKE_BASE_URL = 'https://pancakeswap.finance'
export const BASE_ADD_LIQUIDITY_URL = `${PANCAKE_BASE_URL}/add`
export const BASE_LIQUIDITY_POOL_URL = `${PANCAKE_BASE_URL}/pool`

export const PIG_PER_BLOCK = new BigNumber(0.032) // 0.032 PIG PER BLOCK
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
export const PIG_PER_YEAR = PIG_PER_BLOCK.times(BLOCKS_PER_YEAR)
