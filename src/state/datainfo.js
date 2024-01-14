import { createSlice } from '@reduxjs/toolkit';

const datainfoSlice = createSlice({
    name:'datainfo',
    initialState: {
        data: null,
        regionName: ""
    },
    reducers: {
        setDataInfo(state, action) {
            state.data = action.payload.data;
            state.regionName = action.payload.regionName;
        }
    }
})

export const { setDataInfo } = datainfoSlice.actions;
export default datainfoSlice.reducer;