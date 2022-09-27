import { createSlice } from '@reduxjs/toolkit';


export const vizSlice = createSlice({
    name: 'viz',
    initialState: {
        /**
         * Initially, the visualization is darkened, this effect is removed on first user interaction
         */
        showDarkOverlay: true,

        /**
         * Whether the animation is currently playing
         */
        playing: false,
    },
    reducers: {
        removeDarkOverlay: (state) => {
            state.showDarkOverlay = false;
        },
        play: (state) => {
            state.playing = true;
        },
        stop: (state) => {
            state.playing = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { removeDarkOverlay, play, stop } = vizSlice.actions;
export default vizSlice.reducer;
