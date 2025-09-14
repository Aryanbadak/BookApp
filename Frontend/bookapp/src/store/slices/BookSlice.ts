import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  cover_path?: string;
}

interface BookState {
  items: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const res = await api.get<Book[]>("/books");
  return res.data;
});

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch books";
      });
  },
});

export default bookSlice.reducer;