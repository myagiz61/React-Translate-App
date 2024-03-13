import { createSlice } from "@reduxjs/toolkit";
import { getLanguages, getAnswer } from "./action";

const initialState = {
  language: [],
  answer: "",
  isLoading: true,
  isError: false,
};

export const translateSlice = createSlice({
  name: "translete",
  initialState,
  reducers: {},
  //thunkta reducers yerine extra reducers kullanılır
  extraReducers: (builder) => {
    builder.addMatcher(getLanguages.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addMatcher(getLanguages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.language = action.payload;
      }),
      builder.addMatcher(getLanguages.rejected, (state) => {
        state.isError = "Dilleri Alırken Bir Hata Oluştu";
      }),
      // çeviri istekleri

      builder.addMatcher(getAnswer.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addMatcher(getAnswer.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.answer = action.payload);
      }),
      builder.addMatcher(getAnswer.rejected, (state) => {
        (state.isLoading = false),
          (state.isError = "Çevirirken Hata Oluştu");
      });
  },
});

export default translateSlice.reducer;
