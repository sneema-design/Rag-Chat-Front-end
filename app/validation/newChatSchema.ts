import * as Yup from "yup"
export const newChatValidation=Yup.object({
   title: Yup.string().required("title is required")
})