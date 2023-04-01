import React, { FC } from "react";
import { MdDeleteSweep, MdOutlineEditNote } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";

export interface PostProps {
     title: string;
     id: string;
     body: string;
     i: string;
     DeletePost: (id: string) => void;
}

export const Post: FC<PostProps> = ({ body, id, title, i, DeletePost }) => {
     return (
          <div
               key={i}
               className="col-span-12 xl:col-span-6 lg:col-span-6 md:col-span-12 shadow-lg p-3 rounded-md border-l-8 border-2 border-primary-300 hover:border-primary-500 group"
          >
               <Link to={`/posts?id=${id}`}>
                    <p className="text-xl font-semibold uppercase group-hover:text-primary-500 whitespace-pre-wrap">
                         {title}
                    </p>
               </Link>
               <p className="text-gray-400 text-md group-hover:text-gray-500 whitespace-pre-wrap">{body}</p>
               <div className="flex items-center gap-3">
                    <Link to={`/posts?id=${id}`}>
                         <button className="bg-black text-white px-10 py-2 rounded-md uppercase mt-5">
                              <TbListDetails fontSize={25} />
                         </button>
                    </Link>
                    <button
                         type="button"
                         onClick={() => DeletePost(id)}
                         className="bg-black text-white px-10 py-2 rounded-md uppercase mt-5"
                    >
                         <MdDeleteSweep fontSize={25} />
                    </button>
                    <Link to={`/post?id=${id}`}>
                         <button className="bg-black text-white px-10 py-2 rounded-md uppercase mt-5">
                              <MdOutlineEditNote fontSize={25} />
                         </button>
                    </Link>
               </div>
          </div>
     );
};
