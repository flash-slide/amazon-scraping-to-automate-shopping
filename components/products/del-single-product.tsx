"use client";
import React from "react";
import { deleteProduct } from "@/server/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";

const DelSingleProduct = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const handleDelete = async (productId: string) => {
    const res = await deleteProduct(productId);
    console.log(res);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.success);

      router.push("/");
    }
  };
  return (
    <div
      className="p-2 bg-white-200 rounded-10 cursor-pointer"
      onClick={() => handleDelete(productId)}
    >
      <Trash2Icon />
    </div>
  );
};

export default DelSingleProduct;
