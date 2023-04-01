import * as yup from "yup";
import { NewPostProps } from "../interface";

export const InitialValidation: NewPostProps = {
     body: "",
     title: "",
};

export const validationSchema = yup.object().shape({
     title: yup.string().min(3).required("title for post is required"),
     body: yup.string().min(3).required("body is required"),
});
