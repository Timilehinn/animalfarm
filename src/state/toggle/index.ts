import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InfoValue {
	title: string
	value: number
}

interface tourMod {
	state: boolean
	msg: string
}

interface initialStateProps {
	isMobileNavActive: boolean
	isConfirmModalActive: boolean
	isModalBackDropOpen: boolean
	confirmModalProps: {
		modalTitleText?: string
		confirmButtonText?: string
		value?: string
		text?: string
		warning?: string
		infoValues?: InfoValue[]
		confirmFunction: () => void
	}
	isToastNotificationOpen: boolean
	toastNotificationMsg
	isDepositModalOpen: boolean
	isTourModalOpen: tourMod

	swapModalProps: {
		isSwapModalOpen: boolean
		swapingFrom: {
			tokenName: string
			amount: string
		}
		swapingTo: {
			tokenName: string
			amount: string
		}
		confirmFunction: ()=>void
	}

	isGardenOpen: boolean
	isFaqOpen: boolean
}

const initialState: initialStateProps = {
	isMobileNavActive: false,
	isConfirmModalActive: false,
	isModalBackDropOpen: false,
	confirmModalProps: {
		modalTitleText: 'Confirm Claim',
		confirmButtonText: 'Depo',
		value: '',
		text: '',
		warning: 'Are you sure',
		infoValues: [],
		confirmFunction: null,
	},
	isToastNotificationOpen: false,
	toastNotificationMsg: '',
	isDepositModalOpen: false,
	isTourModalOpen: {
		state: false,
		msg: '',
	},
	// swap modal props
	swapModalProps: {
		isSwapModalOpen: false,
		swapingFrom: {
			tokenName: '',
			amount: '',
		},
		swapingTo: {
			tokenName: '',
			amount: '',
		},
		confirmFunction: null,
	},
	// garden info props
	isGardenOpen: false,
	isFaqOpen: false
}

const toggleSlice = createSlice({
	name: 'toggleSlice',
	initialState,
	reducers: {
		toggleMobileNav: (state, action: PayloadAction<boolean>) => {
			state.isMobileNavActive = action.payload
		},
		toggleConfirmModal: (state, action: PayloadAction<boolean>) => {
			state.isConfirmModalActive = action.payload
		},
		toggleModalBackDrop: (state, action: PayloadAction<boolean>) => {
			state.isModalBackDropOpen = action.payload
		},
		setModalProps: (state, action: PayloadAction<any>) => {
			state.confirmModalProps = action.payload
		},
		toggleToastNotification: (state, action: PayloadAction<any>) => {
			state.isToastNotificationOpen = action.payload.state
			state.toastNotificationMsg = action.payload.msg
		},
		toggleDepositModal: (state, action: PayloadAction<any>) => {
			state.isDepositModalOpen = action.payload
		},
		toggleTourModal: (state, action: PayloadAction<any>) => {
			state.isTourModalOpen.msg = action.payload.msg
			state.isTourModalOpen.state = action.payload.state
		},
		toggleSwapModal: (state, action: PayloadAction<any>) => {
			state.swapModalProps = action.payload
		},
		toggleGardenModal: (state, action: PayloadAction<any>) => {
			state.isGardenOpen = action.payload
		},
		toggleFaqModal: (state, action: PayloadAction<any>) => {
			state.isFaqOpen = action.payload
		}
	},
})

export default toggleSlice.reducer
export const { toggleMobileNav, toggleModalBackDrop, toggleConfirmModal, setModalProps, toggleToastNotification, toggleDepositModal, toggleTourModal,toggleSwapModal, toggleGardenModal, toggleFaqModal } = toggleSlice.actions
