import { PayloadAction, createSlice } from '@reduxjs/toolkit'


interface InfoValue {
    title :string,
    value : number
}

interface initialStateProps {
    isMobileNavActive : boolean
    isConfirmModalActive : boolean
    isModalBackDropOpen : boolean
    confirmModalProps: {
        value : string
        text : string
        warning:string,
        infoValues:InfoValue[],
        confirmFunction: () => void
    
    }
    isToastNotificationOpen : boolean,
    toastNotificationMsg,
    isDepositModalOpen:boolean
}

const initialState:initialStateProps = {

    isMobileNavActive : false,
    isConfirmModalActive : false,
    isModalBackDropOpen : false,
    confirmModalProps: {
        value : '',
        text : '',
        warning:'Are you sure',
        infoValues:[

        ],
        confirmFunction : null
    },
    isToastNotificationOpen:false,
    toastNotificationMsg: '',
    isDepositModalOpen:false


}

const toggleSlice = createSlice({
    name : "toggleSlice",
    initialState,
    reducers : {
        toggleMobileNav:(state,action:PayloadAction<boolean>) => {
            state.isMobileNavActive = action.payload
        },
        toggleConfirmModal:(state,action:PayloadAction<boolean>)=>{
            state.isConfirmModalActive = action.payload
        },
        toggleModalBackDrop:(state,action:PayloadAction<boolean>)=>{
            state.isModalBackDropOpen = action.payload
        },
        setModalProps:(state,action:PayloadAction<any>)=>{
            state.confirmModalProps = action.payload
        },
        toggleToastNotification:(state,action:PayloadAction<any>) =>{
            state.isToastNotificationOpen = action.payload.state
            state.toastNotificationMsg = action.payload.msg
        },
        toggleDepositModal:(state,action:PayloadAction<any>) =>{
            state.isDepositModalOpen = action.payload
        },
        
    }
})

export default toggleSlice.reducer
export const { 
    toggleMobileNav,
    toggleModalBackDrop, 
    toggleConfirmModal, 
    setModalProps,
    toggleToastNotification,
    toggleDepositModal
} = toggleSlice.actions