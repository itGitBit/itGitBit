import { createSlice } from "@reduxjs/toolkit";

const recipesSlice = createSlice({
    name: "recipes",
    initialState: {
        recipes: [],
        loading: false,
        isShowingTheFullList: false
    },
    reducers: {

        setRecipes: (state, action) => {
            state.recipes = action.payload;
        },
        setIsShowingTheFullListFalse: (state) => {
            state.isShowingTheFullList = false;
        },
        setIsShowingTheFullListTrue: (state) => {
            state.isShowingTheFullList = true;
        },
        addRecipe: (state, action) => {
            state.recipes.push(action.payload);
        },
        deleteRecipe: (state, action) => {
            state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
        },
        updateRecipe: (state, action) => {
            state.recipes = state.recipes.map(recipe => recipe.id === action.payload.id ? action.payload : recipe);
        },
        toggleLoadingScreen: (state) => {
            state.loading = !state.loading;
        }
    }
});

export const { setRecipes, addRecipe, deleteRecipe, updateRecipe, toggleLoadingScreen, setIsShowingTheFullListFalse, setIsShowingTheFullListTrue } = recipesSlice.actions;
export default recipesSlice.reducer;