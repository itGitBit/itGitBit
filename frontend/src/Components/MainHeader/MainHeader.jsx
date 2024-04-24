import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/user-slice';
import { useDispatch, useSelector } from 'react-redux';
import { setRecipes } from '../../store/recipes-slice';

const MainHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector(state => state.user.token);

    const loadAndNavigate = () => {
        dispatch(setRecipes([]));
        navigate('/recipes');
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    const navButtonStyle = "bg-primary hover:bg-accent1 text-white font-bold py-2 px-4 rounded";
    const navButtonContainerStyle = "space-x-4"; // Adjust this value to change the gap size

    const loggedInDisplay = () => {
        return (
            <nav className={navButtonContainerStyle}>
                <button className={navButtonStyle} onClick={() => navigate('/')}>Home</button>
                <button className={navButtonStyle} onClick={loadAndNavigate}>Recipes</button>
                <button className={navButtonStyle} onClick={() => navigate('/ingredients')}>Recipe Search</button>
                <button className={navButtonStyle} onClick={() => navigate('/add-recipe')}>Add Recipe</button>
                <button className={navButtonStyle} onClick={() => navigate('/user')}>User Info</button>
                <button className={navButtonStyle} onClick={handleLogout}>Logout</button>
            </nav>
        )
    }

    const loggedOutDisplay = () => {
        return (
            <nav className={navButtonContainerStyle}>
                <button className={navButtonStyle} onClick={() => navigate('/')}>Home</button>
                <button className={navButtonStyle} onClick={() => navigate('/login')}>Login</button>
                <button className={navButtonStyle} onClick={() => navigate('/signup')}>Signup</button>
            </nav>
        )
    };

    return (
        <header className="bg-accent3 py-4">
            <div className="container mx-auto">
                {token ? loggedInDisplay() : loggedOutDisplay()}
            </div>
        </header>
    );
}

export default MainHeader;
