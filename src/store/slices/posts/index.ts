import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { DeleteSpecificPost, EditSpecificPost, GetPosts, GetSpecificPost } from "../../action";

const PostSlice = createSlice({
     name: "posts",
     initialState: {
          data: [],
          loading: false,
          error: "",
          single: {},
          edit: {},
     },
     reducers: {
          EditPost: (state, action) => {
               state.edit = action.payload;
          },
     },
     extraReducers: {
          [GetPosts.fulfilled.type]: (state, action) => {
               state.data = action.payload;
               state.loading = false;
          },
          [GetPosts.pending.type]: (state) => {
               state.loading = true;
               state.data = [];
               state.error = "";
          },
          [GetPosts.rejected.type]: (state, action) => {
               state.error = action.payload;
          },
          [GetSpecificPost.fulfilled.type]: (state, action) => {
               state.single = action.payload;
               state.loading = false;
          },
          [GetSpecificPost.pending.type]: (state) => {
               state.loading = true;
          },
          [GetSpecificPost.rejected.type]: (state, action) => {
               state.error = action.paylaod;
          },
          [EditSpecificPost.fulfilled.type]: (state, action) => {
               state.edit = action.payload;
               state.loading = false;
          },
          [EditSpecificPost.pending.type]: (state) => {
               state.loading = true;
          },
     },
});

export const PostReducer = PostSlice.reducer;
export const {} = PostSlice.actions;
export const usePostSelector = () =>
     useSelector((state: any) => {
          return state.posts;
     });
export const usePostDispatch = () => useDispatch();
