import {createSlice} from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        caption: "",
        description:""
    },
    reducers: {
        caption(state, action){
            state.caption = action.payload;
        },
        description(state, action){
            state.description = action.payload;
        }
    }
})

console.log(postSlice.actions);

export const {caption, description} = postSlice.actions;

export default postSlice.reducer;
