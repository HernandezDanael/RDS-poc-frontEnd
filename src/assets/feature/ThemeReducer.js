import { createSlice } from '@reduxjs/toolkit';

export const ThemeSlice = createSlice({
  name: 'Theme',
  initialState: {
    value: { theme: 'light' },
  },
  reducers: {
    updateTheme: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
