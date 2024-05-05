"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { deleteProductAction } from "./edit/product.action";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  productId: string;
};

export const DeleteButton = ({ productId }: Props) => {
  const router = useRouter();

  const [isDeleteConfirmed, setIsDeleteConfirmed] = React.useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => deleteProductAction(productId),
    onSuccess: ({ data, serverError }) => {
      if (serverError) {
        toast.error(serverError);
        return;
      }
      toast.success("Product deleted");
      router.push("/products");
      router.refresh();
    },
  });

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        console.log({ isDeleteConfirmed });

        if (isDeleteConfirmed) {
          deleteMutation.mutate();
          redirect("/products");
        }

        setIsDeleteConfirmed(true);
      }}
    >
      {deleteMutation.isPending && (
        <Loader2 className="mr-2 size-4 animate-spin" />
      )}
      {isDeleteConfirmed ? "Are you sure ?" : "Delete"}
    </Button>
  );
};
