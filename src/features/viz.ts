import { createSlice } from '@reduxjs/toolkit';


export const vizSlice = createSlice({
    name: 'viz',
    initialState: {
        playing: false,
    },
    reducers: {
        play: (state) => {
            state.playing = true;
        },
        stop: (state) => {
            state.playing = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { play, stop } = vizSlice.actions;
export default vizSlice.reducer;
