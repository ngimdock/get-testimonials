"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductType } from "./product.schema";

export type ProductFormProps = {
  defaultValues?: ProductType;
};

export const ProductForm = ({ defaultValues }: ProductFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
      </CardHeader>
    </Card>
  );
};
