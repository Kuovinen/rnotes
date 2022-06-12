import { configureStore } from "@reduxjs/toolkit";
import { counterNote } from "../features/notes/notesSlice";
export const store = configureStore({
  reducer: {
    notes: counterNote.reducer,
  },
});
export type IRootState = ReturnType<typeof store.getState>;
