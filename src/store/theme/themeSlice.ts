import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

interface ThemeState {
    mode: Theme;
}

const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme as Theme;
    }

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
};

const initialState: ThemeState = {
    mode: getInitialTheme(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            if (state.mode === 'light') state.mode = 'dark';
            else state.mode = 'light';

            localStorage.setItem('theme', state.mode);
        },
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.mode = action.payload;
            localStorage.setItem('theme', state.mode);
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
