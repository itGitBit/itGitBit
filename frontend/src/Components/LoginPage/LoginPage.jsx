import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../store/user-slice";
import { useSelector } from "react-redux";
import errorHandler from "../errors/error-handler";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailRef = useRef('');
    const passwordRef = useRef('');

    const token = useSelector(state => state.user.token);
    const fromNavigated = useSelector(state => state.history.from);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const loginData = await performLogin(email, password);
     
        if (loginData) {
            dispatch(login(loginData.accessToken));
            navigate(fromNavigated ? fromNavigated : '/');
        }
    }

    const performLogin = async (email, password) => {
        const response = await fetch(`http://localhost:3001/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.status !== 200) {
            errorHandler(data.details);
        }
        if (response.status === 200) {
            return data;
        }
        return null;
    }

    return (
        !token ?
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-3xl font-bold mb-4 text-primary">Login Page</h2>
                <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input type="email" id="email" className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary" ref={emailRef} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input type="password" id="password" className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary" ref={passwordRef} />
                    </div>
                    <button type="submit" className="bg-primary text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent2 focus:ring-opacity-50">Login</button>
                </form>
            </div> :
            <Navigate to={fromNavigated} />
    );
}

export default LoginPage;
