import { createSlice,PayloadAction } from '@reduxjs/toolkit'

const initialState = {

    pigsBalance : 0,
    busdBalance : 0,
    pigsBusdLpBalance:0
}


const balanceSlice = createSlice({
    name : 'balance',
    initialState,
    reducers : {
        setPigsBalance: (state, action:PayloadAction<number>) => {
            state.pigsBalance = action.payload
        },
        setBusdBalance:(state,action:PayloadAction<number>)=>{
            state.busdBalance = action.payload
        },
        setPigsBusdLpBalance:(state,action:PayloadAction<number>)=>{
            state.busdBalance = action.payload
        }
    }


})


export const { setPigsBalance, setBusdBalance, setPigsBusdLpBalance  } = balanceSlice.actions
export default balanceSlice.reducer