"use server"; // don't forget to add this!

import { scrapeAndStoreProduct } from "@/server/actions";
import { actionClient } from "./safe-action";
import { TitleInputSchema } from "@/types/title-input-schema";

export const scrapeData = actionClient
  .schema(TitleInputSchema)
  .action(async ({ parsedInput: { amazonProductLink } }) => {
    console.log("amazonProductLink", amazonProductLink);
    const scrapedProduct = await scrapeAndStoreProduct(amazonProductLink);
    if (!scrapedProduct) {
      return { error: "Failed to scrape product" };
    }
    return { success: "Product scraped and stored successfully" };
  });
