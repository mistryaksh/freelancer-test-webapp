import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { EditSpecificPost, GetSpecificPost } from "../../store/action";
import { usePostSelector } from "../../store/slices";
import { MdDeleteSweep } from "react-icons/md";
import { Formik } from "formik";
import { validationSchema } from "../../validation";
import { NewPostProps } from "../../interface";

export const EditPostPage = () => {
     const dispatch = useDispatch<AppDispatch>();
     const [searchParams] = useSearchParams();
     const id = searchParams.get("id");
     const posts = usePostSelector();
     const navigate = useNavigate();

     useEffect(() => {
          dispatch(GetSpecificPost(id as string));
     }, []);

     const editPost = ({ body, title }: NewPostProps) => {
          dispatch(EditSpecificPost({ id: posts.single.id, data: { body, title } }));
          navigate("/", { replace: true });
     };
     return (
          <div className="h-screen flex justify-center items-center bg-primary-500">
               <Formik
                    initialValues={{ body: posts.single.body, title: posts.single.title }}
                    onSubmit={editPost}
                    validationSchema={validationSchema}
               >
                    {({ errors, values, touched, handleBlur, handleSubmit, handleChange }) => (
                         <form onSubmit={handleSubmit} className="w-[40%]">
                              <div className="justify-center w-full items-center outline-none focus:outline-none">
                                   <div className="">
                                        {/*content*/}
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                             {/*header*/}
                                             <div className="flex items-start justify-between p-5 border-b border-solid  rounded-t">
                                                  <h3 className="text-3xl font-semibold uppercase">
                                                       you are editing {posts.single.id} post!
                                                  </h3>
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
                                                       className="bg-primary-500 text-white active:bg-primary-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                       type="submit"
                                                  >
                                                       Save Changes
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </form>
                    )}
               </Formik>
               <div className="absolute left-10 flex gap-5 bottom-10">
                    <Link to="/" className="">
                         <button className="bg-black text-white px-10 py-3 rounded-md">Back</button>
                    </Link>
                    <button type="button" className="bg-black text-white px-10 py-3 flex gap-3 rounded-md uppercase">
                         <MdDeleteSweep fontSize={25} /> delete this post
                    </button>
               </div>
          </div>
     );
};
