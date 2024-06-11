import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'light',
    mode2: []
}
const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        getMode: (state, action) => {
            state.mode = action.payload;
        },
        getMode2: (state, action) => {

            if (state.mode2.length > 0) {
                state.mode2 = [];
                if (state.mode === 'light') {
                    state.mode = 'dark'
                }
                else {
                    state.mode = 'light'
                }

            }
            else {
                state.mode2.push(action.payload);
                if (state.mode === 'light') {
                    state.mode = 'dark'
                }
                else {
                    state.mode = 'light'
                }

            }
        }
    }

})
export default modeSlice.reducer;
export const { getMode, getMode2 } = modeSlice.actions;