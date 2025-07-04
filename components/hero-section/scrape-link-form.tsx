"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TitleInputSchema } from "@/types/title-input-schema";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { scrapeData } from "@/server/actions/scrape-data";

const ScrapeLinkForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof TitleInputSchema>>({
    resolver: zodResolver(TitleInputSchema),
    defaultValues: {
      amazonProductLink: "",
    },
  });

  const { execute, status, result } = useAction(scrapeData, {
    onSuccess: ({ data }) => {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
        setIsLoading(false);
      }
      if (data?.success) {
        toast.success(data?.success);
        setIsLoading(false);
      }
    },
  });

  // Watch the amazonProductLink field
  const amazonLink = form.watch("amazonProductLink");
  const isButtonDisabled = !amazonLink || isLoading;

  function onSubmit(values: z.infer<typeof TitleInputSchema>) {
    setIsLoading(true);
    const { amazonProductLink } = values;
    execute({ amazonProductLink });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-3xl mx-auto px-6"
      >
        <div className="flex flex-col w-full items-center gap-2">
          <FormField
            control={form.control}
            name="amazonProductLink"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Amazon Product Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Amazon product link"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-3 w-full"
            disabled={isButtonDisabled}
          >
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
