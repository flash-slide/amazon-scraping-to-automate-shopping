"use server";

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "@/lib/utils";
import { User } from "@/types";
import { actionClient } from "./safe-action";
import { addUserEmailToProductSchema } from "@/types/email-input-schema";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return null;

  try {
    connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return null;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    // Revalidate both the product page and home page
    revalidatePath(`/products/${newProduct._id}`);
    revalidatePath("/");
    return newProduct;
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();

    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();

    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}

export const addUserEmailToProduct = actionClient
  .schema(addUserEmailToProductSchema)
  .action(async ({ parsedInput: { productId, userEmail } }) => {
    try {
      const product = await Product.findById(productId);

      if (!product) return { error: "Product not found" };

      const userExists = product.users.some(
        (user: User) => user.email === userEmail
      );

      if (!userExists) {
        product.users.push({ email: userEmail });
        await product.save();

        const emailContent = await generateEmailBody(product, "WELCOME");

        await sendEmail(emailContent, [userEmail]);
        return { success: "Email added successfully" };
      }

      return { error: "Email already exists" };
    } catch (error) {
      console.log(error);
      return { error: "Failed to add email" };
    }
  });

export async function deleteProduct(productId: string) {
  try {
    connectToDB();

    const deletedProduct = await Product.findByIdAndDelete(productId, {
      new: true,
    });

    if (!deletedProduct) return { error: "Product not found" };
    revalidatePath("/");

    return { success: "Product deleted successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete product" };
  }
}
