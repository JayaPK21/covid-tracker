import { configureStore } from '@reduxjs/toolkit';

import datainfoReducer from './datainfo';

export const store = configureStore({
    reducer: {
        datainfo: datainfoReducer
    }
})