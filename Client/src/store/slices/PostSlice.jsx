import {createSlice} from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: null,
    reducers: {
        addPost(state, action){
        
        },
        deletePost(state, action){

        },
    }
})

console.log(postSlice.actions);

export default postSlice.reducer;
