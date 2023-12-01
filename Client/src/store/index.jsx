import { configureStore} from '@reduxjs/toolkit';
import postSlice from './slices/PostSlice'

const store = configureStore({
    reducer: {
        posts : postSlice
    }
})

export default store;