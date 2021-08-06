import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {
        infor: null,
        role: 0
    },
    reducers: {
        login: (state, action) => {
            state.infor = {
                displayName: action.payload.displayName,
                email: action.payload.email,
                photoURL: action.payload.photoURL
            };
            if (action.payload.email === "admin@vnutraining.com") {
                state.role = 1;
            } else {
                state.role = 0;
            }
        },
        logout: state => ({
            infor: null,
            role: 0
        })
    }
});

const { reducer, actions } = user;
export const { login, logout } = actions;
export default reducer;