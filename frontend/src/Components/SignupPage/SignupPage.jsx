import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import errorHandler from '../errors/error-handler';

const SignupPage = () => {

    const navigate = useNavigate();


    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const emailRef = useRef('');
    const profilePictureRef = useRef('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        const profilePicture = profilePictureRef.current.value
        const signupData = await performSignup({ username, password, email, profilePicture });
        if (signupData) {
            navigate('/');
        }
    }

    const performSignup = async (data) => {
        try {

            const response = await fetch(`http://localhost:3001/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            if (response.status !== 200) {
                throw new Error(responseData.details || 'Signup failed!');
            }
            if (response.status === 200) {
                return responseData;
            }
        }
        catch (error) {
            errorHandler(error)
        }
    }

    return (
        <div className="signup-sheet">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" ref={usernameRef} placeholder="Enter your username" required min={3} max={30} />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" ref={passwordRef} placeholder="Enter your password" required min={6} max={30} />
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" ref={emailRef} placeholder="Enter your email" required />
                <label htmlFor="profilePicture">Profile Picture: </label>
                <input type="link" id="profilePicture" ref={profilePictureRef} accept="image/*" />
                <button type="submit">Sign Up</button>
            </form>

        </div>

    );



}
export default SignupPage;