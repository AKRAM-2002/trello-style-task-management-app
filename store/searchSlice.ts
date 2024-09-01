import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
  searchString: string | null;
}

const initialState: SearchState = {
  searchString: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchString(state, action) {
      state.searchString = action.payload;
    },
  },
});

export const { setSearchString } = searchSlice.actions;
export default searchSlice.reducer;
