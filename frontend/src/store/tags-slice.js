    import { createSlice } from "@reduxjs/toolkit";

const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        allTagsList: []
    },
    reducers: {
        setAllTagsList(state, action) {
            state.allTagsList = action.payload;
        }
    }
});
export const {setAllTagsList} = tagsSlice.actions;

export default tagsSlice.reducer;
