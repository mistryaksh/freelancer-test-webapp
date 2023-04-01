import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { DeleteSpecificPost, GetCommentsByPost, GetPosts, GetSpecificPost } from "../../store/action";
import { useCommentSelector, usePostSelector } from "../../store/slices";
import { MdDeleteSweep } from "react-icons/md";

export const PostDetails = () => {
     const [searchParams] = useSearchParams();
     const id = searchParams.get("id");
     const posts = usePostSelector();
     const comments = useCommentSelector();
     const dispatch = useDispatch<AppDispatch>();
     const DeletePost = async (id: string) => {
          dispatch(DeleteSpecificPost(id as string));
          dispatch(GetPosts());
     };
     useEffect(() => {
          dispatch(GetSpecificPost(id as string));
          dispatch(GetCommentsByPost(id as string));
     }, []);
     return (
          <div className="relative px-10">
               <div className="absolute left-10 flex gap-5 bottom-10">
                    <Link to="/" className="">
                         <button className="bg-black text-white px-10 py-3 rounded-md">Back</button>
                    </Link>
                    <button
                         type="button"
                         onClick={() => DeletePost(posts.single.id)}
                         className="bg-black text-white px-10 py-3 flex gap-3 rounded-md uppercase"
                    >
                         <MdDeleteSweep fontSize={25} /> delete this post
                    </button>
               </div>

               <div className="grid grid-cols-12 items-start gap-5">
                    <div className="col-span-12 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 xs:col-span-12 py-10">
                         <div className="">
                              <h6 className="text-4xl font-semibold text-primary-500 white capitalize">
                                   {posts.single.title}
                              </h6>
                              <p className="text-gray-500 mt-3">{posts.single.body}</p>
                         </div>
                    </div>
                    <div className="col-span-12 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 xs:col-span-12 overflow-y-scroll h-screen py-10 px-5">
                         <div className="flex flex-col gap-5">
                              {comments.data
                                   .map(({ body, email, name }: any, i: number) => (
                                        <div
                                             key={i}
                                             className="bg-white px-3 py-3 flex justify-start items-start gap-5 shadow-xl rounded-md group border-2"
                                        >
                                             <div className="bg-primary-500 rounded-md px-3 py-3">
                                                  <h6 className="text-4xl text-white uppercase">{name.charAt(0)}</h6>
                                             </div>
                                             <div>
                                                  <h5 className="text-2xl group-hover:text-primary-500 font-semibold uppercase">
                                                       {name}
                                                  </h5>
                                                  <h6 className="text-xl whitespace-pre-wrap">{email}</h6>
                                                  <p className="text-gray-500">{body}</p>
                                                  <div className="flex justify-end w-full">
                                                       <button className="bg-black text-white px-10 py-2 rounded-md uppercase mt-5">
                                                            <MdDeleteSweep fontSize={25} />
                                                       </button>
                                                  </div>
                                             </div>
                                        </div>
                                   ))
                                   .slice(0, 10)}
                         </div>
                    </div>
               </div>
          </div>
     );
};
