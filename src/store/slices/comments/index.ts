import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { GetCommentsByPost } from "../../action";

const CommentSlice = createSlice({
     name: "comment",
     initialState: {
          data: [],
          loading: false,
          error: "",
          single: {},
     },
     reducers: {},
     extraReducers: {
          [GetCommentsByPost.fulfilled.type]: (state, action) => {
               state.data = action.payload;
               state.loading = false;
          },
          [GetCommentsByPost.pending.type]: (state) => {
               state.loading = false;
          },
          [GetCommentsByPost.rejected.type]: (state, action) => {
               state.error = action.payload;
          },
     },
});

export const CommentReducer = CommentSlice.reducer;
// export const {} = CommentSlice.actions;
export const useCommentSelector = () =>
     useSelector((state: any) => {
          return state.comment;
     });
export const useCommentDispatch = () => useDispatch();
