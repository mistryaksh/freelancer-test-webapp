import axios from "axios";
import { CommentsProps } from "../interface";

class CommentService {
     public async GetCommentsByPostId(postId: string) {
          return await axios.get<CommentsProps[]>(`${process.env.REACT_APP_JSON_PLACEHOLDER}/posts/${postId}/comments`);
     }
}

export default new CommentService();
