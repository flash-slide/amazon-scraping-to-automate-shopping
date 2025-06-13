"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailInputSchema } from "@/types/email-input-schema";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { addUserEmailToProduct } from "@/server/actions";

interface InputEmailFormProps {
  productId: string;
  setOpen: (open: boolean) => void;
}

export function InputEmailForm({ productId, setOpen }: InputEmailFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof emailInputSchema>>({
    resolver: zodResolver(emailInputSchema),
    defaultValues: {
      email: "",
    },
  });

  const { execute, status, result } = useAction(addUserEmailToProduct, {
    onSuccess: ({ data }) => {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
        setIsLoading(false);
      }
      if (data?.success) {
        toast.success(data?.success, {
          action: {
            label: "Open Gmail",
            onClick: () => {
              window.open("https://mail.google.com", "_blank");
            },
          },
        });
        setIsLoading(false);
        setOpen(false);
      }
    },
  });

  function onSubmit(values: z.infer<typeof emailInputSchema>) {
    setIsLoading(true);
    const { email } = values;
    execute({ productId, userEmail: email });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="someone@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your email address to track the product price.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending to email...
            </>
          ) : (
            "Send Email"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default InputEmailForm;
