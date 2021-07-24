import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        login: (state, action) => {
            if (state.length === 0) {
                state.push(action.payload);
            } else {
                state.length = 0;

                state.push(action.payload);
            }

        },
        logout: (state, action) => {

            state.length = 0;
        }
    }
});

const { reducer, actions } = user;
export const { login, logout } = actions;
export default reducer;