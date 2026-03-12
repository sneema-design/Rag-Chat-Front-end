"use client";
import type { chatValues } from "@/app/types/chatType";
import { useFormik } from "formik";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { chatValidationSchema } from "@/app/validation/chat.schema";
import { useAskQuestion } from "@/app/services/chat/useChatService";
import { useState } from "react";
type props={
  chatId:number
}
export default function ChatForm({chatId}:props) {
  const [answer, setAnswer] = useState("");
  const { mutate, isLoading, isError } = useAskQuestion();

  const [chats, setChats] = useState([{ user: "", bot: "" }]);

  const formik = useFormik<chatValues>({
    initialValues: { query: "" },
    validationSchema: chatValidationSchema,
    onSubmit: (values, { resetForm }) => {
      mutate(values, {
        onSuccess: (data) => {
          console.log("data", data);
          setChats([...chats, { user: values.query, bot: data.answer }]); // <-- update state here
          resetForm(); // <-- reset form after success
        },
        onError: (error) => {
          setAnswer("Failed to get response.");
          console.error(error.message);
        },
      });
    },
  });

  return (
    <>
      <h1>{chatId}</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="query"
          name="query"
          type="text"
          placeholder="Enter the question"
          value={formik.values.query}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.query ? formik.errors.query : undefined}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>

      {isError && <p style={{ color: "red" }}>Something went wrong!</p>}

      <div className="mx-40">
        <div className="flex flex-col space-y-4 p-4 h-[400px] overflow-y-auto bg-amber-100 rounded-lg">
          {chats.map((item, index) => (
            <div key={index} className="flex flex-col space-y-1">
              {/* User message - left aligned */}
              <div className="flex justify-start">
                <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                  {item.user}
                </div>
              </div>

              {/* Bot message - right aligned */}
              <div className="flex justify-end">
                <div className="bg-green-500 text-white p-2 rounded-lg max-w-xs">
                  {item.bot}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
