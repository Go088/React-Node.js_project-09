import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBoardById = createAsyncThunk(
  "board/fetchboard",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/getBoard/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllCards = createAsyncThunk(
  "board/fetchCards",
  async (text, thunkAPI) => {
    try {
      const response = await axios.get("/getCards");
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addColumn = createAsyncThunk(
  "board/addColumn",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.post(`/board/${id}/column`, data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  "board/deleteColumn",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/deleteColumn/${id}`);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editColumn = createAsyncThunk(
  "board/editColumn",
  async ({ _id, data }, thunkAPI) => {
    try {
      const response = await axios.put(`/editColumn/${_id}`, data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addCard = createAsyncThunk(
  "board/addCard",
  async ({ _id, data }, thunkAPI) => {
    try {
      const response = await axios.post(`/column/${_id}/card`, data);
      console.log(response.data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
