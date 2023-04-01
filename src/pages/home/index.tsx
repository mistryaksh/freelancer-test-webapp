import React, { useState } from "react";
import { usePostSelector } from "../../store/slices";
import { Link } from "react-router-dom";
import { MdDeleteSweep, MdOutlineEditNote } from "react-icons/md";
import { useDispatch } from "react-redux";
import { DeleteSpecificPost, GetPosts, NewPost } from "../../store/action";
import { AppDispatch } from "../../store";
import { Formik } from "formik";
import { InitialValidation, validationSchema } from "../../validation";
import { NewPostProps } from "../../interface";
import { TbListDetails } from "react-icons/tb";
import { Post } from "../../component";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { enqueueSnackbar } from "notistack";

export const Home = () => {
     const posts = usePostSelector();
     const dispatch = useDispatch<AppDispatch>();
     const DeletePost = async (id: string, title: string) => {
          dispatch(DeleteSpecificPost(id as string));
          dispatch(GetPosts());
          enqueueSnackbar(`Ok So You Deleted! ${title}`, {
               variant: "success",
               anchorOrigin: { horizontal: "right", vertical: "top" },
          });
     };
     const [modal, setModal] = useState<boolean>(false);
     const toggleModal = () => {
          setModal(!modal);
     };
     const createPost = ({ title, body }: NewPostProps) => {
          dispatch(NewPost({ body: body, title: title }));
          dispatch(GetPosts());
          toggleModal();
          enqueueSnackbar(`Yay, You Created Post Successfully! ${title}`, {
               variant: "success",
               anchorOrigin: { horizontal: "right", vertical: "top" },
          });
     };
     return (
          <div>
               <div className="h-[60vh] flex justify-center items-center flex-col">
                    <h1 className="text-6xl font-semibold text-center uppercase">json placeholder typicode</h1>
                    <p className="text-gray-500 mt-5 text-lg">
                         This is React & Redux Toolkit webapp which is having posts and it's comments with details.
                    </p>
                    <div className="flex gap-3">
                         <Link to="https://jsonplaceholder.typicode.com/">
                              <button className="bg-black text-white px-10 py-2 rounded-md uppercase mt-5">
                                   view docs
                              </button>
                         </Link>
                         <button
                              type="button"
                              onClick={toggleModal}
                              className="bg-black text-white px-10 py-2 rounded-md uppercase mt-5"
                         >
                              create new post
                         </button>
                    </div>
               </div>
               {posts.loading && (
                    <div className="w-full flex justify-center h-full items-center">
                         <AiOutlineLoading3Quarters fontSize={200} className="animate-spin text-primary-500" />
                    </div>
               )}
               <div className="grid grid-cols-12 gap-10 px-5 py-2">
                    {posts.data

                         .map(({ body, title, id }: any, i: string) => (
                              <Post
                                   key={id}
                                   title={title}
                                   DeletePost={() => DeletePost(id, title)}
                                   body={body}
                                   i={i}
                                   id={id}
                              />
                         ))
                         .reverse()
                         .slice(0, 10)}
               </div>
               {modal ? (
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                         <Formik
                              initialValues={InitialValidation}
                              onSubmit={createPost}
                              validationSchema={validationSchema}
                         >
                              {({ errors, values, touched, handleBlur, handleSubmit, handleChange }) => (
                                   <form onSubmit={handleSubmit} className="relative w-auto my-6 mx-auto max-w-3xl">
                                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                             <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                  {/*content*/}
                                                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                       {/*header*/}
                                                       <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                            <h3 className="text-3xl font-semibold uppercase">
                                                                 Try to create new post!
                                                            </h3>
                                                            <button
                                                                 className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                 onClick={toggleModal}
                                                            >
                                                                 <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                      ×
                                                                 </span>
                                                            </button>
                                                       </div>
                                                       {/*body*/}
                                                       <div className="relative p-6 flex-auto">
                                                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                                 <div>
                                                                      <input
                                                                           className="border w-full py-1 resize-none focus:outline-none px-5"
                                                                           placeholder="Enter post title"
                                                                           type="text"
                                                                           value={values.title}
                                                                           onChange={handleChange("title")}
                                                                           onBlur={handleBlur("title")}
                                                                      />
                                                                      {touched.title && (
                                                                           <p className="text-red-500 text-xs mt-2 uppercase">
                                                                                {errors.title}
                                                                           </p>
                                                                      )}
                                                                 </div>
                                                                 <div>
                                                                      <textarea
                                                                           className="border w-full py-1 resize-none focus:outline-none px-5 mt-3"
                                                                           placeholder="Enter post description"
                                                                           value={values.body}
                                                                           onChange={handleChange("body")}
                                                                           onBlur={handleBlur("body")}
                                                                           name="body"
                                                                           id="body"
                                                                           rows={5}
                                                                      ></textarea>
                                                                      {touched.body && (
                                                                           <p className="text-red-500 text-xs uppercase">
                                                                                {errors.body}
                                                                           </p>
                                                                      )}
                                                                 </div>
                                                            </p>
                                                       </div>
                                                       {/*footer*/}
                                                       <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                            <button
                                                                 className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                 type="button"
                                                                 onClick={toggleModal}
                                                            >
                                                                 Close
                                                            </button>
                                                            <button
                                                                 className="bg-primary-500 text-white active:bg-primary-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                 type="submit"
                                                            >
                                                                 Save Changes
                                                            </button>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                   </form>
                              )}
                         </Formik>
                    </div>
               ) : null}
          </div>
     );
};
