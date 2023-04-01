import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import { EditPostPage, Home, PostDetails } from "./pages";
import { GetPosts } from "./store/action";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";

export default function App() {
     const dispatch = useDispatch<AppDispatch>();
     useEffect(() => {
          dispatch(GetPosts());
     }, []);

     return (
          <Routes>
               <Route element={<Home />} path="/" />
               <Route element={<PostDetails />} path="/posts" />
               <Route element={<EditPostPage />} path="/post" />
          </Routes>
     );
}
