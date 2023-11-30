import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: 13,
}

export const Slice = createSlice({
    name: 'slice',
    initialState,
    reducers:{
        increment: (state) =>{
            state.value+=1
            console.log(state.value);
        }
    }
})

export const {increment} = Slice.actions
export default Slice.reducer;