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
import { createProductAction, updateProductAction } from "./product.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { uploadImageAction } from "@/features/uploads/upload.action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export type ProductFormProps = {
  productId?: string;
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

export const ProductForm = ({ productId, defaultValues }: ProductFormProps) => {
  const router = useRouter();
  const form = useZodForm({
    schema: ProductSchema,
    defaultValues,
  });

  const isCreate = !Boolean(defaultValues);

  const mutation = useMutation({
    mutationFn: async (values: ProductType) => {
      const { data, serverError } = isCreate
        ? await createProductAction(values)
        : await updateProductAction({ id: productId as string, data: values });

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      toast.success(isCreate ? "Product created" : "Product updated");

      router.push(`/products/${data.product.id}`);
    },
  });

  const submitImage = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.set("file", file);

      const { data, serverError } = await uploadImageAction(formData);

      if (!data || serverError) {
        toast.error(serverError);
        return;
      }

      const url = data.url;

      form.setValue("image", url);
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>

                <div className="flex items-center gap-4">
                  <FormControl className="flex-1">
                    <Input
                      type="file"
                      placeholder="Product image"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) return;

                        if (file.size > 1024 * 1024) {
                          e.target.value = "";
                          toast.error(
                            "File is too big. Maximum file size is 1mb"
                          );
                          return;
                        }

                        if (!file.type.startsWith("image")) {
                          e.target.value = "";
                          toast.error("File is not an image");
                          return;
                        }

                        console.log({ type: "form", file });

                        submitImage.mutate(file);
                      }}
                    />
                  </FormControl>
                  {field.value && (
                    <Avatar>
                      <AvatarImage src={field.value} />
                    </Avatar>
                  )}
                </div>
                <FormDescription>The image of the product</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="iphone-15"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        .replaceAll(/ /g, "-")
                        .toLowerCase();

                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The slug is used in the url of the review page
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
