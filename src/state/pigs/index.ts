import { createSlice,PayloadAction } from '@reduxjs/toolkit'

const initialState = {

    pigsAvailableToClaim : 0,
    pigsBusdPrice : 0
}


const pigsSlice = createSlice({
    name : 'pigsCredit',
    initialState,
    reducers : {
        setPigsAvailableToClaim: (state, action:PayloadAction<number>) => {
            state.pigsAvailableToClaim = action.payload
        },
        setPigsBusdPrice: (state, action:PayloadAction<number>) => {
            state.pigsAvailableToClaim = action.payload
        }
    }


})


export const { setPigsAvailableToClaim, setPigsBusdPrice  } = pigsSlice.actions
export default pigsSlice.reducer