import { toast } from 'react-toastify'

const useToast = () => {
	const toastSuccess = (message: string) => {
		toast.success(message, {
			position: toast.POSITION.BOTTOM_LEFT,
		})
	}

	const toastError = (message: string) => {
		toast.error(message, {
			position: toast.POSITION.BOTTOM_LEFT,
		})
	}

	const toastWarning = (message: string) => {
		toast.warn(message, {
			position: toast.POSITION.BOTTOM_LEFT,
		})
	}

	const toastInfo = (message: string) => {
		toast.info(message, {
			position: toast.POSITION.BOTTOM_LEFT,
		})
	}

	return { toastSuccess, toastError, toastWarning, toastInfo }
}

export default useToast
