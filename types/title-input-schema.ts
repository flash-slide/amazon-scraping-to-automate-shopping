import * as z from "zod";

export const TitleInputSchema = z.object({
  amazonProductLink: z
    .string()
    .min(1, "Please enter a valid Amazon product link")
    .url("Please enter a valid URL")
    .refine((url) => {
      try {
        const urlObj = new URL(url);
        return (
          urlObj.hostname.includes("amazon.com") ||
          urlObj.hostname.includes("amazon.co.uk") ||
          urlObj.hostname.includes("amazon.de") ||
          urlObj.hostname.includes("amazon.fr") ||
          urlObj.hostname.includes("amazon.it") ||
          urlObj.hostname.includes("amazon.es") ||
          urlObj.hostname.includes("amazon.ca") ||
          urlObj.hostname.includes("amazon.com.mx") ||
          urlObj.hostname.includes("amazon.com.br") ||
          urlObj.hostname.includes("amazon.com.au") ||
          urlObj.hostname.includes("amazon.co.jp") ||
          urlObj.hostname.includes("amazon.in")
        );
      } catch {
        return false;
      }
    }, "Please enter a valid Amazon product URL")
    .refine((url) => {
      try {
        const urlObj = new URL(url);
        return (
          urlObj.pathname.includes("/dp/") ||
          urlObj.pathname.includes("/gp/product/")
        );
      } catch {
        return false;
      }
    }, "Please enter a valid Amazon product page URL"),
});
