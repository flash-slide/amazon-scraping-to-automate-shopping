"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface BuyNowButtonProps {
  productUrl: string;
}

const BuyNowButton = ({ productUrl }: BuyNowButtonProps) => {
  const handleBuyNow = () => {
    window.parent.postMessage(
      {
        type: "START_AUTOMATION",
        productUrl,
      },
      "*"
    );
    // debugger;
    console.log("clicked");
  };

  return (
    <Button
      className="w-fit mx-auto flex items-center justify-center gap-3 min-w-[150px] bg-black text-white rounded-full hover:bg-black/80 transition-colors duration-400 py-6 px-2 cursor-pointer"
      onClick={handleBuyNow}
    >
      <Image src="/assets/icons/bag.svg" alt="check" width={22} height={22} />
      <span className="text-base text-white">Buy Now</span>
    </Button>
  );
};

export default BuyNowButton;
