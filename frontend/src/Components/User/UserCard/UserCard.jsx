import { useEffect, useState } from "react";
import { getData } from "../../../utils/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRecipes } from "../../../store/recipes-slice";

const UserCard = ({ id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({ username: '', profilePicture: '' });

    useEffect(() => {
        getUser(id);
    }, [id]);

    const getUser = async (id) => {
        const fetchedUser = await getData(id, "users");
        setUser(fetchedUser);
    }

    const handleFilterRecipesByUser = async (id) => {
        const response = await fetch(`http://localhost:3001/recipes/byuser/${id}`);
        const data = await response.json();
        dispatch(setRecipes(data));
    }

    return (
        <div className="border border-gray-300 rounded-lg shadow-md p-4 max-w-xs mx-auto">
            <h3 className="text-xl font-semibold mb-2">{user.username}</h3>
            <img className="w-24 h-24 rounded-full object-cover mx-auto mb-4" src={user.profilePicture} alt="profile" />
            <button onClick={() => handleFilterRecipesByUser(id)} className="bg-primary text-white py-2 px-4 rounded-md mb-4">View Their Recipes</button>
        </div>
    );
};

export default UserCard;
