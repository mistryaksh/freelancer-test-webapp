import { configureStore } from "@reduxjs/toolkit";
import { CommentReducer, PostReducer } from "./slices";

const store = configureStore({
     reducer: {
          posts: PostReducer,
          comment: CommentReducer,
     },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
