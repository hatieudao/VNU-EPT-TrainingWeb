import { createSlice } from '@reduxjs/toolkit';


const examSetting = createSlice({
    name: 'examSetting',
    initialState: {
        examID: null,
        textColor: '#000',
        time: 25,
        fontSize: 18,
    },
    reducers: {
        addSetting: (state, action) => {
            state.examID = action.payload.id;
            state.textColor = action.payload.textColor;
            state.time = action.payload.time;
            state.fontSize = action.payload.fontSize;
        },
    }
});

const { reducer, actions } = examSetting;
export const { addSetting } = actions;
export default reducer;