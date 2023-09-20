import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  current: "",
  alreadyGuessed: [],
  correctGuesses: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
  guessNumber: 1,
  guessPrevious: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setAlreadyGuessed: (state, action) => {
      state.alreadyGuessed = action.payload;
    },
    setCorrectGuesses: (state, action) => {
      state.correctGuesses = action.payload;
    },
    addCorrectGuess: (state, action) => {
      state.correctGuesses[action.payload] += 1;
    },
    resetGuesses: (state) => {
      state.guessPrevious = initialState.guessPrevious;
      state.guessNumber = initialState.guessNumber;
    },
    setGuessNumber: (state, action) => {
      state.guessNumber = action.payload;
    },
    setGuessPrevious: (state, action) => {
      state.guessPrevious = action.payload;
    },
  },
});

export const {
  setMode,
  setCurrent,
  setAlreadyGuessed,
  addCorrectGuess,
  setCorrectGuesses,
  resetGuesses,
  setGuessNumber,
  setGuessPrevious
} = authSlice.actions;
export default authSlice.reducer;
