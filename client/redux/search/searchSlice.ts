//NOTUSED

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SearchState {
  searchQuery: string;
}

const initialState: SearchState = {
  searchQuery: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

//setters
export const { setSearchQuery } = searchSlice.actions;

//getters
export const selectSearchQuery = (state: RootState) => state.search.searchQuery;

export default searchSlice.reducer;
