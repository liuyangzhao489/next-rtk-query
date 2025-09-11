import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "@/type"; 

interface UsersState {
  users: Student[];
  selectedUser: Student | null;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
};

const studentSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<Student>) {
      state.users.push(action.payload); 
    },
    updateUser(state, action: PayloadAction<Student>) {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    removeUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter(user => String(user.id) !== action.payload);
    },
    getUserById(state, action: PayloadAction<string>) {
      const user = state.users.find(user => String(user.id) === action.payload);
      state.selectedUser = user ?? null;
    },
  },
});

export const { addUser, updateUser, removeUser, getUserById } = studentSlice.actions;
export default studentSlice.reducer;
