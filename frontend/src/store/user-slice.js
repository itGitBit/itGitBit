import { createSlice } from "@reduxjs/toolkit";


// export const getUser = createAsyncThunk("user/getUser", async (id) => {
//     try {
//         const response = await fetch(`http://localhost:3001/users/${id}`);
//         return await response.json();
//     } catch (error) {
//         toast.error(error.message);
//     }
// });


const userSlice = createSlice({
    name: "user",
    initialState: {
        token: sessionStorage.getItem('token') || null,
    },
    reducers: {
        login: (state, action) => {
            const loggedIn = sessionStorage.getItem('token');
            if (loggedIn) {
                state.token = loggedIn;
                return;
            }
            state.token = action.payload;
            sessionStorage.setItem('token', action.payload);
            return;
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    },
});
export const { login, logout, setToken } = userSlice.actions;

export default userSlice.reducer;