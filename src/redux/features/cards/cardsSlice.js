import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
});

export default cardSlice.reducer;
