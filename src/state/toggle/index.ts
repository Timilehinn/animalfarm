import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface initialStateProps {
    isMobileNavActive : boolean
}

const initialState:initialStateProps = {

    isMobileNavActive : false
}

const toggleSlice = createSlice({
    name : "toggleSlice",
    initialState,
    reducers : {
        toggleMobileNav:(state,action:PayloadAction<boolean>) => {
            state.isMobileNavActive = action.payload
        }
    }
})

export default toggleSlice.reducer
export const { toggleMobileNav } = toggleSlice.actions