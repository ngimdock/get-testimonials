import { requiredCurrentUser } from "@/auth/current-user";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LayoutDescription,
  LayoutTitle,
  LayoutWrapper,
} from "@/features/layout/layaout-wrapper";
import { prisma } from "@/lib/prisma";
import type { PageParams } from "@/types/next";
import { Product } from "@prisma/client";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{}>) {
  const user = await requiredCurrentUser();

  const products = await prisma.product.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      _count: {
        select: {
          reviews: {
            where: {
              text: {
                not: null,
              },
            },
          },
        },
      },
    },
  });

  return (
    <LayoutWrapper>
      <div className="flex items-center justify-between">
        <div className=" space-y-0.5">
          <LayoutTitle>Products</LayoutTitle>
          <LayoutDescription>Create product to review.</LayoutDescription>
        </div>
        <Link
          href="/products/new"
          className={buttonVariants({ variant: "secondary" })}
        >
          Create Product
        </Link>
      </div>
      {products.length ? (
        <Table>
          <TableHeader>
            <TableHead>Product Name</TableHead>
            <TableHead>Product Slug</TableHead>
            <TableHead>Reviews </TableHead>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <CustomTableRow
                key={product.id}
                product={{ ...product, reviews: product._count.reviews }}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <Link
          href="/products/new"
          className="flex w-full  items-center justify-center rounded-lg border-2 border-dashed border-primary p-8 transition-colors hover:bg-accent/40 lg:p-12"
        >
          Create Product
        </Link>
      )}
    </LayoutWrapper>
  );
}

function CustomTableRow({
  product,
}: {
  product: Partial<Product & { reviews: number }>;
}) {
  return (
    <TableRow>
      <Link href={`/products/${product.id}`}>
        <TableCell>{product.name}</TableCell>
      </Link>
      <TableCell className="font-mono">{product.slug}</TableCell>
      <TableCell className="font-mono">{product.reviews}</TableCell>
    </TableRow>
  );
}
