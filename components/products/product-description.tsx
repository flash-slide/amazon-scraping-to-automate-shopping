"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const DescriptionSection = ({ description }: { description: string }) => {
  const [simplifiedDesc, setSimplifiedDesc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimplify = async () => {
    // console.log("description", description);
    try {
      setIsLoading(true);
      const response = await fetch("/api/simplify-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });
      console.log("response from gemini", response);

      if (!response.ok) {
        // Log the actual error message from the server
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(
          `Failed to simplify description: ${
            errorData.error || "Unknown error"
          }`
        );
      }

      const data = await response.json();
      setSimplifiedDesc(data.simplifiedDescription);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <h3 className="text-2xl text-black font-semibold">
          Product Description
        </h3>
        <Button
          onClick={handleSimplify}
          className="w-fit cursor-pointer rounded-full"
          disabled={isLoading}
        >
          {isLoading ? "Simplifying..." : "Simplify the description with AI"}
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {simplifiedDesc
          ? simplifiedDesc.split("\n").map((line, i) => <p key={i}>{line}</p>)
          : description.split("\n")}
      </div>
    </div>
  );
};

export default DescriptionSection;
