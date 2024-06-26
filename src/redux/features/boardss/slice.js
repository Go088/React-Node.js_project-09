import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBoardById,
  fetchAllCards,
  addColumn,
  deleteColumn,
  editColumn,
  addCard,
  deleteCard,
  editCard,
} from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const boardSlice = createSlice({
  name: "board",
  initialState: {
    board: {},
    cards: [],

    isLoading: false,
    error: null,
    toast: "",
  },
  reducers: {
    setDeletBord: (state, action) => {
      state.board = action.payload;
    },
    setContactError: (state, action) => {
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardById.pending, handlePending)
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.board = action.payload;
      })
      .addCase(fetchBoardById.rejected, handleRejected)
      .addCase(fetchAllCards.pending, handlePending)
      .addCase(fetchAllCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cards = action.payload;
      })
      .addCase(fetchAllCards.rejected, handleRejected)
      .addCase(addColumn.pending, handlePending)
      .addCase(addColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.board.columns.push(action.payload);
      })
      .addCase(addColumn.rejected, handleRejected)
      .addCase(deleteColumn.pending, handlePending)
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.board.columns = state.board.columns.filter(
          (column) => column._id !== action.payload
        );
      })
      .addCase(deleteColumn.rejected, handleRejected)
      .addCase(editColumn.pending, handlePending)
      .addCase(editColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.board.columns.findIndex(
          (column) => column._id === action.payload._id
        );
        state.board.columns[index] = action.payload;
      })
      .addCase(editColumn.rejected, handleRejected)
      .addCase(addCard.pending, handlePending)
      .addCase(addCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cards.push(action.payload);
      })
      .addCase(addCard.rejected, handleRejected)
      .addCase(deleteCard.pending, handlePending)
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cards = state.cards.filter((card) => card._id !== action.payload);
      })
      .addCase(deleteCard.rejected, handleRejected)
      .addCase(editCard.pending, handlePending)
      .addCase(editCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.cards.findIndex(
          (card) => card._id === action.payload._id
        );
        state.cards[index] = action.payload;
      })
      .addCase(editCard.rejected, handleRejected);
  },
});
export const { setDeletBord, setContactError } = boardSlice.actions;
export const boardReducer = boardSlice.reducer;
