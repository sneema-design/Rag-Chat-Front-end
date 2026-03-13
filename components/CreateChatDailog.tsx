"use client";

import { useState } from "react";
import { newChatValue } from "@/app/types/allChatType";
import { newChatValidation } from "@/app/validation/newChatSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { useCreateChat } from "@/app/services/allChat/useAllChatService";
import { Plus, Sparkles } from "lucide-react";
import { FormInput } from "./ui/FormInput";

type props = {
  setChatId: (id: number) => void;
};

export function CreateChatDialog({ setChatId }: props) {
  const [open, setOpen] = useState(false);
  const Id = Number(localStorage.getItem("userId"));
  const { mutate } = useCreateChat();

  const formik = useFormik<newChatValue>({
    initialValues: {
      title: "",
      userId: Id,
    },
    validationSchema: newChatValidation,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => {
      mutate(values, {
        onSuccess: (data) => {
          setChatId(data.id);
          resetForm();
          setOpen(false);
        },
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-xl border border-slate-200">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader className="space-y-3 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <DialogTitle className="text-xl font-semibold text-slate-900">
                Create New Chat
              </DialogTitle>
            </div>
            <DialogDescription className="text-slate-600">
              Give your conversation a meaningful title to get started.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="space-y-4 py-6">
            <Field>
              <Label
                htmlFor="title"
                className="text-sm font-medium text-slate-700 mb-2 block"
              >
                Chat Title
              </Label>

              <FormInput
                id="title"
                label="Chat Title"
                placeholder="e.g., Project Discussion, Quick Questions..."
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.title}
                error={formik.errors.title}
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="flex gap-3 pt-4 border-t border-slate-200">
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                className="rounded-lg border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all px-6"
            >
              Create Chat
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
