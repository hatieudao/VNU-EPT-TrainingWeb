import { createSlice } from '@reduxjs/toolkit';

const submissions = createSlice({
    name: 'submissions',
    initialState: [],
    reducers: {
        addSubmission: (state, action) => {
            state.push(action.payload);
        }
    }
});

const { reducer, actions } = submissions;
export const { addSubmission } = actions;
export default reducer;