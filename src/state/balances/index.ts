import { createSlice,PayloadAction } from '@reduxjs/toolkit'

const initialState = {

    pigsBalance : 0,
    busdBalance : 0,
}


const balanceSlice = createSlice({
    name : 'balance',
    initialState,
    reducers : {
        setPigsBalance: (state, action:PayloadAction<number>) => {
            state.pigsBalance = action.payload
        }
    }


})


export const { setPigsBalance  } = balanceSlice.actions
export default balanceSlice.reducer