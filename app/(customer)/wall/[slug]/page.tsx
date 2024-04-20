import { LayoutTitle, LayoutWrapper } from "@/features/layout/layaout-wrapper";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import type { PageParams } from "@/types/next";
import { notFound } from "next/navigation";
import { ReviewCard } from "./ReviewCard";

export default async function Page(props: PageParams<{ slug: string }>) {
  const product = await prisma.product.findUnique({
    where: {
      slug: props.params.slug,
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

  // calcule review average
  const reviewAverage = await prisma.review.aggregate({
    where: {
      productId: product.id,
      text: {
        not: null,
      },
      reviewerName: {
        not: null,
      },
    },

    _avg: {
      ratting: true,
    },
    _count: {
      _all: true,
    },
  });

  return (
    <LayoutWrapper className="my-12 flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        {product.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="size-12 object-cover"
          />
        )}
        <h1 className="text-nowrap text-2xl font-bold">{product.name}</h1>
      </div>

      <div>
        <h2 className="text-4xl font-extrabold">
          {" "}
          {reviewAverage._avg.ratting} / 5
        </h2>
        <p>{reviewAverage._count._all} reviews</p>
      </div>

      <div className="grid w-full gap-3 md:grid-cols-2 lg:grid-cols-3">
        {product.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </LayoutWrapper>
  );
}
