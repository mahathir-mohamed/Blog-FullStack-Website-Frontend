import {configureStore} from '@reduxjs/toolkit';
import userDetailSlice from './userDetailSlice';

const Store = configureStore({
    reducer:{
        user:userDetailSlice.reducer
    }
})

export default Store;