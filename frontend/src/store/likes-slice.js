import { createSlice } from "@reduxjs/toolkit";

const likesSlice = createSlice({
    name: "likes",
    initialState: {
        likes: [],
    },
    reducers: {
        setLikes: (state, action) => {
            state.likes = action.payload;
        },
        addLike: (state, action) => {
            state.likes.push(action.payload);
        },
        removeLike: (state, action) => {
            state.likes = state.likes.filter(like => like.id !== action.payload);
        }
    },
});
export const { setLikes, addLike, removeLike } = likesSlice.actions;
export default likesSlice.reducer;