import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  animeList: [],
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
  previousGuesses: [],
  finished: false,
  correct: false,
  tipsNumber: {
    review : 1,
    studio: 2,
    genres: 2,
    format: 3,
    popularity: 3,
    tags: 4,
    scores: 5,
    recommendations: 6
  },
  tipsColor: {
    review : "white",
    studio: "white",
    genres: "white",
    format: "white",
    popularity: "white",
    tags: "white",
    scores: "white",
    recommendations: "white"
  }
};

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setAnimeList: (state, action) => {
      state.animeList = action.payload;
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
      state.previousGuesses = initialState.previousGuesses;
      state.guessNumber = initialState.guessNumber;
      state.finished = initialState.finished;
      state.correct = initialState.correct;
    },
    resetUser: (state) => {
      state.alreadyGuessed = initialState.alreadyGuessed;
      state.correctGuesses = initialState.correctGuesses;
      state.animeList = initialState.animeList;
      state.current = initialState.current;
      state.guessNumber = initialState.guessNumber;
      state.previousGuesses = initialState.previousGuesses;
      state.finished = initialState.finished;
      state.correct = initialState.correct;
      state.tipsNumber = initialState.tipsNumber;
      state.tipsColor = initialState.tipsColor;
    },
    setGuessNumber: (state, action) => {
      state.guessNumber = action.payload;
    },
    setPreviousGuesses: (state, action) => {
      state.previousGuesses = action.payload;
    },
    setFinished: (state, action) => {
      state.finished = action.payload;
    },
    setCorrect: (state, action) => {
      state.correct = action.payload;
    },
    setTipsNumber: (state, action) => {
      state.tipsNumber = action.payload
    },
    setTipsColor: (state, action) => {
      state.tipsColor = action.payload
    }
  },
});

export const {
  setMode,
  setAnimeList,
  setCurrent,
  setAlreadyGuessed,
  addCorrectGuess,
  setCorrectGuesses,
  resetGuesses,
  resetUser,
  setGuessNumber,
  setPreviousGuesses,
  setFinished,
  setCorrect,
  setTipsNumber,
  setTipsColor
} = animeSlice.actions;
export default animeSlice.reducer;
