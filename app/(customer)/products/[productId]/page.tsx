import { requiredCurrentUser } from "@/auth/current-user";
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

  console.log({ reviews: product.reviews });

  return (
    <LayoutWrapper>
      <LayoutTitle>{product.name}</LayoutTitle>

      <div className="flex gap-4 max-lg:flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Slug: {product.slug}</p>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableHead>Reviewer Name</TableHead>
                <TableHead>Review text</TableHead>
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
