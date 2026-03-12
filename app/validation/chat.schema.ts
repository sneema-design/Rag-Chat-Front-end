import * as Yup from "yup"

export const chatValidationSchema= Yup.object({
    query: Yup.string().required("query is required")
})