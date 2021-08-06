import { createSlice } from '@reduxjs/toolkit';


const submissions = createSlice({
    name: 'submissions',
    initialState: [],
    reducers: {
        addSubmission: (state, action) => {
            state.push(action.payload);
        },
        resetSubmission: state => []
    }
});

const { reducer, actions } = submissions;
export const { addSubmission, resetSubmission } = actions;
export default reducer;