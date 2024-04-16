import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import type { PageParams } from "@/types/next";
import { notFound } from "next/navigation";
import { ProcessReviewStep } from "./ProcessReviewStep";

export const maxDuration = 360;

export default async function RoutePage(props: PageParams<{ slug: string }>) {
  const product = await prisma.product.findUnique({
    where: {
      slug: props.params.slug,
    },
  });

  if (!product) return notFound();

  return (
    <div
      className={cn(
        "h-full w-full flex items-center flex-col p-4",
        product.backgroundColor
      )}
    >
      <div className="flex items-center gap-2">
        {product.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="size-8 object-cover"
          />
        )}
        <h1 className="text-nowrap text-lg font-bold">{product.name}</h1>
      </div>

      <div className="flex-1">
        <ProcessReviewStep product={product} />
      </div>
    </div>
  );
}
