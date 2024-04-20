import { requiredCurrentUser } from "@/auth/current-user";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ArrowBigLeftIcon, Link2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function RoutePage(
  props: PageParams<{ productId: string }>
) {
  const user = await requiredCurrentUser();

  const product = await prisma.product.findUnique({
    where: {
      id: props.params.productId,
      userId: user.id,
    },
    include: {
      reviews: {
        where: {
          reviewerName: {
            not: null,
          },
          text: {
            not: null,
          },
        },
      },
    },
  });

  if (!product) return notFound();

  return (
    <LayoutWrapper>
      <div className="flex items-center justify-between">
        <Link href="/products" className="flex items-center">
          <ArrowBigLeftIcon size={16} className="mr-2" />
          <span>All product</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href={`/products/${product.id}/edit`}
            className={buttonVariants({ size: "sm", variant: "secondary" })}
          >
            Edit
          </Link>
          <LayoutTitle>{product.name}</LayoutTitle>
        </div>
      </div>

      <div className="flex gap-4 max-lg:flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-2">
            <p>Slug: {product.slug}</p>

            <Link
              href={`/r/${product.slug}`}
              className={buttonVariants({
                size: "sm",
              })}
            >
              <Link2 size={16} className="mr-2" />
              Share review link
            </Link>

            <Link
              href={`/wall/${product.slug}`}
              className={buttonVariants({
                size: "sm",
              })}
            >
              <Link2 size={16} className="mr-2" />
              Wall link
            </Link>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableHead>Name</TableHead>
                <TableHead>text</TableHead>
              </TableHeader>
              <TableBody>
                {product.reviews.map((review) => (
                  <TableRow key={review.id}>
                    <Link href={`/products/${review.id}`}>
                      <TableCell>{review.reviewerName}</TableCell>
                    </Link>
                    <TableCell>{review.text}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  );
}
