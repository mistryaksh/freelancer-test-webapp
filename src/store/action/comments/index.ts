import { createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "../../../services/commentService";

export const GetCommentsByPost = createAsyncThunk("comments/all", async (postId: string) => {
     const data = await commentService.GetCommentsByPostId(postId);
     return data.data;
});
