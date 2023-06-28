import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CounterState {
  value: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: "string",
};

export const counterNote = createSlice({
  name: "note",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    change: (state) => {
      state.value = state.value + "+";
    },
    schange: (state) => {
      state.value = state.value + "-";
    },
  },
});
export const { change, schange } = counterNote.actions;

export default counterNote;
