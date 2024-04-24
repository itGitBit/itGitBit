import { useCallback, useEffect } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import { getAllData } from "../../../utils/apiCalls";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsShowingTheFullListTrue, setRecipes, toggleLoadingScreen } from "../../../store/recipes-slice";
import { jwtDecode } from 'jwt-decode';
import { setLikes } from "../../../store/likes-slice";
import errorHandler from "../../errors/error-handler";


const RecipeList = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.recipes.loading);
    const recipes = useSelector(state => state.recipes.recipes);
    const token = useSelector(state => state.user.token);
    const isShowingTheFullList = useSelector(state => state.recipes.isShowingTheFullList);


    const getAllRecipes = useCallback(async () => {
        if (recipes.length > 0) {
            return;
        }
        dispatch(toggleLoadingScreen());
        try {
            const fetchedRecipes = await getAllData("recipes");
            dispatch(setRecipes(fetchedRecipes));
            dispatch(setIsShowingTheFullListTrue())
        } catch (error) {
            errorHandler(error.message);
        } finally {
            dispatch(toggleLoadingScreen());
        }
    }, [dispatch, recipes])

    const getLikesByUser = useCallback(async () => {
        if (!token) {
            return;
        }
        const response = await fetch(`http://localhost:3001/likes/byuser/${jwtDecode(token).id}`);
        const data = await response.json();

        dispatch(setLikes(data));
    }, [dispatch, token]);

    useEffect(() => {
        getAllRecipes();
        getLikesByUser();
    }, [getAllRecipes, getLikesByUser]);

    return (
        token ?
            <div className="container mx-auto py-8">
                {!isShowingTheFullList && <button className="bg-primary text-white py-2 px-4 rounded-lg mb-4" onClick={() => dispatch(setRecipes([]))}>Show All Recipes</button>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? <h3 className="text-center">Loading...</h3> : recipes.map((recipe, index) => (
                        <div key={index}>
                            <RecipeCard
                                id={recipe.id}
                                title={recipe.title}
                                description={recipe.description}
                                image={recipe.image}
                                steps={recipe.steps}
                                ingredients={recipe.ingredients}
                                tags={recipe.tags}
                                likesAmount={recipe.likesAmount}
                                userId={recipe.userId}
                            />
                        </div>
                    ))}
                </div>
            </div> :
            <Navigate to="/login" />
    );
}

export default RecipeList;
