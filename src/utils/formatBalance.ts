import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { BIG_TEN } from './bigNumber'

/**
 * Take a amount, e.g. 15.63833732 and converts it to 2 decimal place without rounding up, e.g. 15.63
 */
export const amountFormatter = (amount: string, decimals = 18): string => {
	let formattedNumber
	const splittedNum = amount.split('.')
	if (splittedNum[1]) {
		if (splittedNum[1].length >= decimals) {
			formattedNumber = `${splittedNum[0]}.${splittedNum[1].substring(0, decimals)}`
		} else {
			formattedNumber = `${splittedNum[0]}.${splittedNum[1]}`
		}
	} else {
		formattedNumber = `${splittedNum[0]}`
	}
	return formattedNumber
}

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount: string, decimals = 18) => {
	return new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString()
}
export const getDecimalAmountBN = (amount: BigNumber, decimals = 18) => {
	return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
	return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

export const getBalanceAmountString = (amount: string, decimals = 18) => {
	return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals)).toString()
}

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
	return getBalanceAmount(balance, decimals).toNumber()
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18, displayDecimals?: number) => {
	return getBalanceAmount(balance, decimals).toFixed(displayDecimals)
}

export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
	const options = {
		minimumFractionDigits: minPrecision,
		maximumFractionDigits: maxPrecision,
	}
	return number.toLocaleString(undefined, options)
}

/**
 * Method to format the display of wei given an ethers.BigNumber object
 * Note: does NOT round
 */
export const formatBigNumber = (number: ethers.BigNumber, displayDecimals = 18, decimals = 18) => {
	const remainder = number.mod(ethers.BigNumber.from(10).pow(decimals - displayDecimals))
	return formatUnits(number.sub(remainder), decimals)
}

/**
 * Method to format the display of wei given an ethers.BigNumber object with toFixed
 * Note: rounds
 */
export const formatBigNumberToFixed = (number: ethers.BigNumber, displayDecimals = 18, decimals = 18) => {
	const formattedString = formatUnits(number, decimals)
	return (+formattedString).toFixed(displayDecimals)
}

/**
 * Formats a FixedNumber like BigNumber
 * i.e. Formats 9763410526137450427.1196 into 9.763 (3 display decimals)
 */
export const formatFixedNumber = (number: ethers.FixedNumber, displayDecimals = 18, decimals = 18) => {
	// Remove decimal
	const [leftSide] = number.toString().split('.')
	return formatBigNumber(ethers.BigNumber.from(leftSide), displayDecimals, decimals)
}
