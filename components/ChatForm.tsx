"use client";

import type { chatValues } from "@/app/types/chatType";
import { useFormik } from "formik";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { chatValidationSchema } from "@/app/validation/chat.schema";
import { useAskQuestion } from "@/app/services/chat/useChatService";
import { useGetChatById } from "@/app/services/allChat/useAllChatService";
import { useCreateMessage } from "@/app/services/message/useMessageService";
import { Send, Loader2, AlertCircle, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";

type Props = {
  chatId: number;
};

export default function ChatForm({ chatId }: Props) {
  const { mutate, isLoading, isError } = useAskQuestion();
  const { data, isPending, isError: renderError } = useGetChatById(chatId);
  const { mutate: saveChat } = useCreateMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages]);

  const formik = useFormik<chatValues>({
    initialValues: { query: "" },
    validationSchema: chatValidationSchema,

    onSubmit: (values, { resetForm }) => {
      saveChat({ chatId: chatId, role: "user", content: values.query });
      mutate(values, {
        onSuccess: (res) => {
          saveChat({ chatId: chatId, role: "bot", content: res.answer });
          resetForm();
        },
        onError: (error) => {
          console.error(error.message);
        },
      });
    },
  });

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-5 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MessageCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Chat #{chatId}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Active conversation</p>
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scroll-smooth">
        {/* Empty State */}
        {!isPending &&
          (!data?.messages || data.messages.length === 0) &&
          !isError &&
          !renderError && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <div className="p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-slate-900 font-medium">No messages yet</h3>
                <p className="text-slate-500 text-sm">
                  Start a conversation by typing a message below
                </p>
              </div>
            </div>
          )}

        {/* Loading State */}
        {isPending && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-3">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto" />
              <p className="text-slate-600 font-medium">Loading messages...</p>
            </div>
          </div>
        )}

        {/* Error States */}
        {renderError && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mx-auto max-w-md">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm font-medium">
              Failed to load chat messages.
            </p>
          </div>
        )}

        {isError && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mx-auto max-w-md">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm font-medium">
              Something went wrong! Please try again.
            </p>
          </div>
        )}

        {/* Messages */}
        <div className="space-y-3 max-w-4xl mx-auto w-full">
          {data?.messages?.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm transition-all hover:shadow-md ${
                  msg.role === "bot"
                    ? "bg-white text-slate-900 border border-slate-200 rounded-bl-none"
                    : "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none shadow-md"
                }`}
              >
                <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                  {msg.content}
                </p>
                <span
                  className={`text-xs mt-2 block ${msg.role === "bot" ? "text-slate-400" : "text-blue-100"}`}
                >
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form - Sticky Bottom */}
      <div className="bg-white border-t border-slate-200 px-4 py-4 shadow-lg sticky bottom-0">
        <form
          onSubmit={formik.handleSubmit}
          className="flex gap-3 max-w-4xl mx-auto items-end"
        >
          <div className="flex-1 space-y-1">
            <Input
              id="query"
              name="query"
              type="text"
              placeholder="Type your message..."
              value={formik.values.query}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.query ? formik.errors.query : undefined}
              className="rounded-full border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 hover:bg-white transition-all px-5 py-2.5 text-sm"
            />
            {formik.touched.query && formik.errors.query && (
              <p className="text-red-500 text-xs ml-4 font-medium">
                {formik.errors.query}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading || !formik.values.query.trim()}
            className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2.5 transition-all shadow-md hover:shadow-lg flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
