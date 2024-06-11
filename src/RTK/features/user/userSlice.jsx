import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
}
const userSlice = createSlice({
    name: 'userToken',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    }
})
export default userSlice.reducer;
export const { getUser } = userSlice.actions;