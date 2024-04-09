import { requiredCurrentUser } from "@/auth/current-user";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LayoutTitle, LayoutWrapper } from "@/features/layout/layaout-wrapper";
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
  });

  return (
    <LayoutWrapper>
      <LayoutTitle>Products</LayoutTitle>
      <Card className="p-4">
        {products.length ? (
          <ProductTable products={products} />
        ) : (
          <Link
            href="/products/new"
            className="flex w-full  items-center justify-center rounded-lg border-2 border-dashed border-primary p-8 transition-colors hover:bg-accent/40 lg:p-12"
          >
            Create Product
          </Link>
        )}
      </Card>
    </LayoutWrapper>
  );
}

function ProductTable({ products }: { products: Product[] }) {
  return (
    <Table>
      <TableHeader>
        <TableHead>Product Name</TableHead>
        <TableHead>Product Slug</TableHead>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <Link href={`/products/${product.id}`}>
              <TableCell>{product.name}</TableCell>
            </Link>
            <TableCell className="font-mono">{product.slug}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
