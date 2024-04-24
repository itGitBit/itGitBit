import { createSlice } from "@reduxjs/toolkit";

const ingredientsSearchSlice = createSlice({
    name: "ingredientsSearch",
    initialState: {
        fullIngredientsList: [{ id: 0, name: "" }],
        ingredientListToRecipe: [{ id: 0, name: "" }],
        selectedIngredient: null

    },
    reducers: {
        setFullIngredientList(state, action) {
            state.fullIngredientsList = action.payload;
        },
        setSelectedIngredient(state, action) {
            state.selectedIngredient = action.payload;
        },
        setSelectedIngredientList(state, action) {
            state.ingredientListToRecipe = action.payload;
        },
        addToSelectedIngredientList(state, action) {

            if (state.ingredientListToRecipe[0].id === 0) {
                state.ingredientListToRecipe = state.ingredientListToRecipe.filter(ingredient => ingredient.id !== 0);
            }
            state.ingredientListToRecipe.push(action.payload);
        },
        removeFromSelectedIngredientList(state, action) {
            state.ingredientListToRecipe = state.ingredientListToRecipe.filter(ingredient => ingredient.id !== action.payload.id);
        },
        clearSelectedIngredients(state) {
            state.ingredientListToRecipe = [{ id: 0, name: "" }];
        }
    }

});
export const { setFullIngredientList, setSelectedIngredient, setSelectedIngredientList, addToSelectedIngredientList, clearSelectedIngredients, removeFromSelectedIngredientList } = ingredientsSearchSlice.actions;
export default ingredientsSearchSlice.reducer;
