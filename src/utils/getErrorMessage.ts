export const getErrorMessage = (e): string => {
	const defaultErrorMessage = 'An error occured. Try again!'

	if (e.code === 4001) return 'User Rejected Transaction!'
	if (e.code === -32603) return e?.data?.message ? e.data.message : defaultErrorMessage
	return defaultErrorMessage
}
