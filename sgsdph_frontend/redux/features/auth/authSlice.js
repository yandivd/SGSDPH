import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isActive: null,
    user: null,
    rol: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        activeUser: (state, action) => {
            const { user, rol } = action.payload;

            state.isActive = true;
            state.user = user;
            state.rol = rol;
        },
        inactiveUser: (state) => {
            state.isActive = false;
            state.user = null;
            state.rol = null;
        },
    },
});

export const { activeUser, inactiveUser } = authSlice.actions;
export default authSlice.reducer;