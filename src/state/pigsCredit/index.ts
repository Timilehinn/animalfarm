import { createSlice,PayloadAction } from '@reduxjs/toolkit'

const initialState = {

    pigsAvailableToClaim : 0
}


const pigsCreditSlice = createSlice({
    name : 'pigsCredit',
    initialState,
    reducers : {
        setPigsAvailableToClaim: (state, action:PayloadAction<number>) => {
            state.pigsAvailableToClaim = action.payload
        }
    }


})


export const { setPigsAvailableToClaim  } = pigsCreditSlice.actions
export default pigsCreditSlice.reducer