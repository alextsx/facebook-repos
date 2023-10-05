"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
      return state;
    },
  },
});

//actions
export const { setUsers } = userSlice.actions;

//selectors
export const selectUsers = (state: RootState): UserState => state.user;
export const selectUserByFullName = (
  state: RootState,
  fullName: string
): User | null => {
  return state.user[fullName] ?? [];
};

export default userSlice.reducer;
