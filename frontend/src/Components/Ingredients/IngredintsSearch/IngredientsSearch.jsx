import React, { useState } from 'react';
import IngredientsList from '../IngredientsList/IngredientsList';
import { useDispatch } from 'react-redux';
import { clearSelectedIngredients, setSelectedIngredient, removeFromSelectedIngredientList } from '../../../store/ingredient-search-slice';
import { useSelector } from 'react-redux';
import IngredientPage from '../IngredientPage/IngredientPage';
import { setIsShowingTheFullListFalse, setRecipes } from '../../../store/recipes-slice';
import errorHandler from '../../errors/error-handler';
import { useNavigate } from 'react-router-dom';

const IngredientsSearch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    const [showRemoveButton, setShowRemoveButton] = useState(null); // Define showRemoveButton state

    let ingredientListToRecipe = useSelector(state => state.ingredientsSearch.ingredientListToRecipe);

    const filterIngredient = (e) => {
        setSearchValue(e.target.value);
        if (searchValue === "") {
            dispatch(setSelectedIngredient(null));
        } else {
            dispatch(setSelectedIngredient(e.target.value));
        }
    }

    const searchForRecipe = async () => {
        if (ingredientListToRecipe[0].id === 0) {
            errorHandler(`You must add at least 3 ingredients to search for recipes.`);
            return;
        }
        else if (ingredientListToRecipe.length < 3) {
            errorHandler(`You must add at least ${(3 - ingredientListToRecipe.length)} ingredients to search for recipes.`);
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/recipes/getbyingredients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredients: ingredientListToRecipe }),
            });

            if (!response.ok) {
                errorHandler(response.details)
            }
            const recipesData = await response.json();
            dispatch(setRecipes(recipesData));
            dispatch(setIsShowingTheFullListFalse())
            dispatch(clearSelectedIngredients());
            navigate('/recipes');

        } catch (error) {
            errorHandler(error);
        }
    }

    const clearList = () => {
        dispatch(clearSelectedIngredients());
    }

    const handleRemoveIngredient = (ingredient) => {
        if (ingredientListToRecipe.length <= 1) {
            dispatch(clearSelectedIngredients());
        }
        dispatch(removeFromSelectedIngredientList(ingredient));
    }

    return (
        <div className="mx-auto max-w-lg p-4">
            <h1 className="text-2xl font-bold mb-4 text-primary">Ingredients</h1>
            <input
                type="text"
                placeholder="Search Ingredients"
                onChange={filterIngredient}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-primary"
            />
            <div className="flex flex-wrap mb-4">
                {ingredientListToRecipe.map((ingredient, index) => (
                    <div
                        className="relative flex items-center"
                        key={index}
                        onMouseEnter={() => setShowRemoveButton(index)}
                        onMouseLeave={() => setShowRemoveButton(null)}
                        style={{ paddingRight: '2rem' }} // Adjust the padding to accommodate the button
                    >
                        <div className="badge relative bg-gray-200 rounded-md p-2 mr-2 mb-2 flex items-center">
                            <IngredientPage name={ingredient.name} />
                            {ingredientListToRecipe[0].id !== 0  && <button
                                className={`ml-2 text-red-500 opacity-0 absolute top-0 right-0 bg-gray-200 rounded-md p-1 focus:outline-none transition-opacity duration-300 ${showRemoveButton === index ? 'opacity-100' : 'opacity-0'
                                    }`}
                                onClick={() => handleRemoveIngredient(ingredient)}
                            >
                                X
                            </button>}
                        </div>
                    </div>




                ))}
            </div>
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={searchForRecipe}
                    className="bg-primary text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-accent1"
                >
                    Search Recipes
                </button>
                <button
                    onClick={clearList}
                    className="bg-red-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-red-600"
                >
                    Clear List
                </button>
            </div>
            <IngredientsList />
        </div>
    );
}

export default IngredientsSearch;
