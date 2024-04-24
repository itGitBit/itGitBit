import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
    name: "history",
    initialState: {
        from: null
    },
    reducers: {
        addHistory: (state, action) => {
            state.from = action.payload;
        },
        clearHistory: (state) => {
            state.from = null;
        }
    },
});

export const { addHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;