import axios from "axios";
import { NewPostProps, PostProps } from "../interface";

class PostService {
     public async GetAllPosts() {
          return await axios.get<PostProps[]>(`${process.env.REACT_APP_JSON_PLACEHOLDER}/posts`);
     }
     public async CreateNewPost({ body, title }: NewPostProps) {
          return await axios.post<PostProps>(`${process.env.REACT_APP_JSON_PLACEHOLDER}/posts`, {
               body,
               title,
          });
     }
     public async GetSinglePost(id: string) {
          return await axios.get(`${process.env.REACT_APP_JSON_PLACEHOLDER}/posts/${id}`);
     }
     public async DeletePostById(id: string) {
          return await axios.delete(`${process.env.REACT_APP_JSON_PLACEHOLDER}/posts/${id}`);
     }
     public async EditPostById(id: string, data: NewPostProps) {
          return await axios.put(`${process.env.REACT_APP_JSON_PLACEHOLDER}/posts/${id}`, {
               title: data.title,
               body: data.body,
               userId: 1,
          });
     }
}

export default new PostService();
