"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import InputEmailForm from "./input-email-form";

interface Props {
  productId: string;
}

const Modal = ({ productId }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button asChild className="cursor-pointer">
        <DialogTrigger>Track Product</DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Stay updated with product pricing alerts right in your inbox!
          </DialogTitle>
          <DialogDescription>
            Never miss a bargain again with our timely alerts!
          </DialogDescription>
          <InputEmailForm productId={productId} setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
