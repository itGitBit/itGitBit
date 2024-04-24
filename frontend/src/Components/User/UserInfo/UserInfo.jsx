import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../utils/apiCalls";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setRecipes, toggleLoadingScreen } from "../../../store/recipes-slice";
import { toast } from "react-toastify";
import errorHandler from "../../errors/error-handler";

const UserInfo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editImg, setEditImg] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [user, setUser] = useState({ username: '', profilePicture: '', email: '' });
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const token = useSelector(state => state.user.token);

    const getUserInfo = async () => {
        const response = await getData(jwtDecode(token).id, 'users');
        setUser(response);
    }

    const seeYourRecipes = async () => {
        try {
            dispatch(toggleLoadingScreen());
            const response = await fetch(`http://localhost:3001/recipes/byuser/${jwtDecode(token).id}`);
            const fetchedRecipes = await response.json();
            if (fetchedRecipes.length === 0) {
                toast('You have no recipes yet. Showing all recipes instead ')
            };
            dispatch(setRecipes(fetchedRecipes));
        } catch (error) {
            errorHandler(error.message);
        } finally {
            dispatch(toggleLoadingScreen());
        }
        navigate('/recipes');
    }

    const updateUsername = async () => {
        await updateUser();
        setUsername(false);
    }

    const updateEmail = async () => {
        await updateUser();
        setEditEmail(false);
    }

    const updateImage = async () => {
        await updateUser();
        setEditImg(false);
    }

    const updatePassword = async () => {

        // //todo fix this so that the request is not sent if the passwords are the same and that they are hashed
        // const hashedOldPassword = await bcrypt.hash(oldPassword, 10);
        // const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        // setOldPassword(hashedOldPassword);
        // setNewPassword(hashedNewPassword);
        // await updateUserPassword();
        // setEditPassword(false);
    }

    const updateUserPassword = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: jwtDecode(token).id, oldPassword, newPassword })
            });
            const updatedUser = await response.json();
            if (response.status !== 200) {
                throw new Error(updatedUser.details || 'Update failed!');
            }
            else {
                setUser(updatedUser);
            }
        } catch (error) {
            errorHandler(error.message);
        }
    }

    const updateUser = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...user, id: jwtDecode(token).id })
            });
            const updatedUser = await response.json();
            if (response.status !== 200) {
                throw new Error(updatedUser.details || 'Update failed!');
            }
            else {
                setUser(updatedUser);
            }
        } catch (error) {
            errorHandler(error.message);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [token]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">UserInfo</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    {username ? (
                        <div className="flex items-center">
                            <input type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="w-full border border-gray-300 rounded-md p-2" />
                            <button onClick={updateUsername} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Save</button>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <h2 className="text-lg">Username: {user.username}</h2>
                            <button onClick={() => setUsername(true)} className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none">Edit</button>
                        </div>
                    )}
                    {editEmail ? (
                        <div className="flex items-center">
                            <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="w-full border border-gray-300 rounded-md p-2" />
                            <button onClick={() => updateEmail()} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Save</button>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <h2 className="text-lg">Email: {user.email}</h2>
                            <button onClick={() => setEditEmail(!editEmail)} className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none">Edit</button>
                        </div>
                    )}
                    <button onClick={() => seeYourRecipes()} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">See Your Recipes</button>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center">
                        {editImg ? (<div><input type="url" value={user.profilePicture} onChange={(e) => setUser({ ...user, profilePicture: e.target.value })} required className="w-full border border-gray-300 rounded-md p-2" />
                            <button onClick={() => updateImage()} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Save</button>
                        </div>) : (<div><div className="w-24 h-24 overflow-hidden rounded-full border border-gray-300">
                            <img src={user.profilePicture} alt="profile" className="w-full h-full object-cover" />
                        </div>
                            <button onClick={() => setEditImg(!editImg)} className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none">Edit</button>
                        </div>)
                        }
                    </div>
                </div>
            </div>

            {editPassword ? (<div>
                <input type="password" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />

                <input type="password" required min={4} max={30} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
                <button onClick={() => updatePassword()} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Save</button>
            </div>) : (<div>
                <button onClick={() => setEditPassword(!editPassword)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Change Password</button>
            </div>)}

        </div>
    );
}

export default UserInfo;
