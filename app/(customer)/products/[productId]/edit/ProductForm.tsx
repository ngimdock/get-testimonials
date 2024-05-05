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
import { Loader2 } from "lucide-react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      router.refresh();
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
            console.log({ values });

            await mutation.mutateAsync(values);
          }}
        >
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="texts">Texts</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <div className="flex flex-col space-y-6">
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

                              submitImage.mutate(file);
                            }}
                          />
                        </FormControl>
                        {submitImage.isPending && (
                          <Loader2 className="size-6 animate-spin" />
                        )}
                        {field.value && (
                          <Avatar className="rounded-sm">
                            <AvatarFallback>{field.value[0]}</AvatarFallback>
                            <AvatarImage src={field.value} />
                          </Avatar>
                        )}
                      </div>
                      <FormDescription>
                        The image of the product
                      </FormDescription>
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
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
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
                                  className={cn(
                                    gradient,
                                    "w-96 h-8 rounded-md"
                                  )}
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
              </div>
            </TabsContent>
            <TabsContent value="texts">
              <div className="flex flex-col space-y-6">
                <FormField
                  control={form.control}
                  name="noteText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Give note /5."
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormDescription>
                        The title where the user can add the node /5.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="informationText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Information text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please give us some informations"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormDescription>
                        The text displayed while asking for reviewer information
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reviewText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your review message"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormDescription>
                        The title to display while asking review message
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thanksText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thanks text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Thanks you for your review !"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormDescription>
                        The title to display to thanks the user for reviewing
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
          </Tabs>
          <Button className="mt-6 w-full">
            {mutation.isPending && <Loader2 className="size-3 animate-spin" />}
            {isCreate ? "Create Product" : "Save Product"}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};
