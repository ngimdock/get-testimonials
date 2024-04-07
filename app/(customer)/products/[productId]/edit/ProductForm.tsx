"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductSchema, ProductType } from "./product.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createProductAction } from "./product.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type ProductFormProps = {
  defaultValues?: ProductType;
};

const GRADIENTS_COLORS_CLASSES = [
  "bg-gradient-to-r from-amber-200 to-yellow-500",
  "bg-gradient-to-r from-red-500 to-orange-500",
  "bg-gradient-to-r from-rose-400 to-red-500",
  "bg-gradient-to-r from-fuchsia-600 to-pink-600",
  "bg-gradient-to-r from-indigo-500 to-blue-500",
  "bg-gradient-to-r from-violet-600 to-indigo-600",
  "bg-gradient-to-r from-emerald-500 to-emerald-900",
];

export const ProductForm = ({ defaultValues }: ProductFormProps) => {
  const router = useRouter();
  const form = useZodForm({
    schema: ProductSchema,
    defaultValues,
  });

  const isCreate = !Boolean(defaultValues);

  const mutation = useMutation({
    mutationFn: async (values: ProductType) => {
      const { data, serverError } = await createProductAction(values);

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      toast.success("Product created successfully");

      router.push(`/products/${data.product.id}`);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isCreate ? "Create Product" : `Edit Product ${defaultValues?.name}`}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form
          form={form}
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
          }}
          className="flex flex-col space-y-4 "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="iphone 15" {...field} />
                </FormControl>
                <FormDescription>
                  The name of the product to review
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="backgroundColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Color</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select a background color"
                        {...field}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {GRADIENTS_COLORS_CLASSES.map((gradient) => (
                        <SelectItem key={gradient} value={gradient}>
                          <div
                            className={cn(gradient, "w-96 h-8 rounded-md")}
                          ></div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  The review page background color
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>{isCreate ? "Create Product" : "Save Product"}</Button>
        </Form>
      </CardContent>
    </Card>
  );
};
