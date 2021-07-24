import { configureStore } from "@reduxjs/toolkit";
import submissionReducer from './slices/submission';
import userReducer from './slices/user';

const rootReducer = {
    submissions: submissionReducer,
    user: userReducer,
}

const store = configureStore({
    reducer: rootReducer
});

export default store;