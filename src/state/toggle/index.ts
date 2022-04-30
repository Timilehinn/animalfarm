import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface initialStateProps {
    isMobileNavActive : boolean
    isConfirmModalActive : boolean
    isModalBackDropOpen : boolean
    confirmModalProps: {
        value : number
        text : string
        warning:string,
        values:[]  
    
    }
}

const initialState:initialStateProps = {

    isMobileNavActive : false,
    isConfirmModalActive : false,
    isModalBackDropOpen : false,
    confirmModalProps: {
        value : 42,
        text : '',
        warning:'',
        values:[

        ]
    }
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
        setModalProps:(state,action:PayloadAction<boolean>)=>{
            state.confirmModalProps = action.payload
        }
    }
})

export default toggleSlice.reducer
export const { toggleMobileNav,  toggleModalBackDrop, toggleConfirmModal, setc } = toggleSlice.actions