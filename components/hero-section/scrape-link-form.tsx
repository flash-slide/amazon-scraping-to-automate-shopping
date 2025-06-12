"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
import { TitleInputSchema } from "@/types/title-input-schema";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";

const ScrapeLinkForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof TitleInputSchema>>({
    resolver: zodResolver(TitleInputSchema),
    defaultValues: {
      amazonProductLink: "",
    },
  });

  // const { execute, status, result } = useAction(register, {
  //   onSuccess: ({ data }) => {
  //     form.reset();
  //     // if (data?.error) {
  //     //   toast.error(data?.error);
  //     // }
  //     // if (data?.success) {
  //     //   toast.success(data?.success, {
  //     //     action: {
  //     //       label: "Open Gmail",
  //     //       onClick: () => {
  //     //         window.open("https://mail.google.com", "_blank");
  //     //       },
  //     //     },
  //     //   });
  //     // }
  //   },
  // });

  function onSubmit(values: z.infer<typeof TitleInputSchema>) {
    setIsLoading(true);
    const { amazonProductLink } = values;
    execute({ amazonProductLink });
    // Note: You'll need to set isLoading to false in the onSuccess callback of useAction
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col max-w-full items-center gap-2">
          <FormField
            control={form.control}
            name="amazonProductLink"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Amazon Product Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Amazon product link"
                    className="w-[600px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-3 w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scraping...
              </>
            ) : (
              "Scrape"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ScrapeLinkForm;
