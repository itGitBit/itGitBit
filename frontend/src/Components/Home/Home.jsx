import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addHistory } from '../../store/history-slice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleExploreButton = () => {
        const navigateTo = '/recipes';
        dispatch(addHistory(navigateTo));
        navigate(navigateTo);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Home</h1>
            <p className="text-lg mb-4">Welcome to the home page</p>
            <img src="https://images.pexels.com/photos/4033636/pexels-photo-4033636.jpeg" className="w-full max-w-xl rounded-lg mb-4" alt="recipe" />
            <p className="text-lg mb-4">Click the button below to explore all recipes</p>

            <button
                onClick={handleExploreButton}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
                Explore All Recipes
            </button>
        </div>
    );
}

export default Home;
