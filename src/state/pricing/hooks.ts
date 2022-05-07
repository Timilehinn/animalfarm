import { useAppSelector, useAppDispatch } from '../hooks'
import { setPigsBusdPrice as _setPigsBusdPrice } from './index'

export const usePricing = () => {
	const dispatch = useAppDispatch()

	const pigsBusdPrice = useAppSelector((state) => state.pricingReducer.pigsBusdPrice)

	const setPigsBusdPrice = (value: string) => dispatch(_setPigsBusdPrice(value))

	return { pigsBusdPrice, setPigsBusdPrice }
}
