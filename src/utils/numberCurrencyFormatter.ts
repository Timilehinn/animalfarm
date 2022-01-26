const abbreviateNumber = (number) => {
	const CURRENCY_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E']

	// eslint-disable-next-line no-bitwise
	const tier = (Math.log10(Math.abs(number)) / 3) | 0

	// if zero, we don't need a suffix
	if (tier === 0) return number

	// get suffix and determine scale
	const suffix = CURRENCY_SYMBOL[tier]
	// eslint-disable-next-line no-restricted-properties
	const scale = Math.pow(10, tier * 3)

	// scale the number
	const scaled = number / scale

	// format number and add suffix
	return scaled.toFixed(1) + suffix
}

export { abbreviateNumber }
