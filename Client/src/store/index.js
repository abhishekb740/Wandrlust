import {configureStore} from '@reduxjs/toolkit'
import Slice from '../reducers/slice';


export const store = configureStore({
    reducer: {
        counter: Slice
    }
})