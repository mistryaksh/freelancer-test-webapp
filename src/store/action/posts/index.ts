import { createAsyncThunk } from "@reduxjs/toolkit";
import postService from "../../../services/postServices";
import { NewPostProps } from "../../../interface";

export const GetPosts = createAsyncThunk("posts/get-all", async () => {
     const data = await postService.GetAllPosts();
     return data.data;
});

export const NewPost = createAsyncThunk("posts/new", async (props: NewPostProps) => {
     const data = await postService.CreateNewPost(props);
     return data.data;
});

export const GetSpecificPost = createAsyncThunk("posts/one", async (props: string) => {
     const data = await postService.GetSinglePost(props);
     return data.data;
});

export const DeleteSpecificPost = createAsyncThunk("posts/delete", async (props: string) => {
     const data = await postService.DeletePostById(props);
     return data.data;
});

export const EditSpecificPost = createAsyncThunk("posts/edit", async (props: any) => {
     const data = await postService.EditPostById(props.id, props.data);
     return data.data;
});
