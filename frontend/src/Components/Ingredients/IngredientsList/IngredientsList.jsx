import IngredientPage from "../IngredientPage/IngredientPage";
import { getAllData } from "../../../utils/apiCalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { addToSelectedIngredientList, setFullIngredientList } from "../../../store/ingredient-search-slice";

const IngredientsList = () => {
    const dispatch = useDispatch();
    const [ingredients, setIngredients] = useState([]);
    const loading = useSelector(state => state.ingredientsSearch.loading);
    const filterIngredient = useSelector(state => state.ingredientsSearch.selectedIngredient);
    const filteredIngredientList = useSelector(state => state.ingredientsSearch.ingredientListToRecipe);
    const token = useSelector(state => state.user.token);

    useEffect(() => {
        getAllIngredients();
    }, []);

    const getAllIngredients = async () => {
        const fetchedIngredients = await getAllData("ingredients");
        setIngredients(fetchedIngredients);
        dispatch(setFullIngredientList(fetchedIngredients));
    }

    const addFilteredIngredient = (ingredient) => {
        dispatch(addToSelectedIngredientList(ingredient))
    }

    const filteredNamesSet = new Set(filteredIngredientList.map(ingredient => ingredient.name.toLowerCase()));

    return (
        token ?
            <div className="ingredients-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                    ingredients
                        .filter(ingredient => filterIngredient ? ingredient.name.toLowerCase().includes(filterIngredient.toLowerCase()) : true)
                        .filter(ingredient => !filteredNamesSet.has(ingredient.name.toLowerCase()))
                        .map((ingredient, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                                <IngredientPage name={ingredient.name} />
                                <button onClick={() => addFilteredIngredient(ingredient)} className="mt-2 py-2 px-4 bg-primary text-white rounded-md hover:bg-accent1 transition duration-300 ease-in-out">Add to filter</button>
                            </div>
                        ))
                )}
            </div> :
            <Navigate to="/login" />
    );
};

export default IngredientsList;
