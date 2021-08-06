import { configureStore } from "@reduxjs/toolkit";
import submissionReducer from './slices/submission';
import userReducer from './slices/user';
import examSettingReducer from './slices/examSetting';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import thunk from "redux-thunk";
const rootReducer = combineReducers({
    submissions: submissionReducer,
    user: userReducer,
    examSetting: examSettingReducer,
});
const persistConfig = {
    key: 'root',
    storage
};

// const store = configureStore({
//     reducer: rootReducer
// });

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export default store;