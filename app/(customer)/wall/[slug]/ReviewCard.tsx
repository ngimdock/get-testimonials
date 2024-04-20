import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Review } from "@prisma/client";
import { Star } from "lucide-react";
import { ReviewStars } from "./ReviewStars";

export const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{review.reviewerName}</CardTitle>
        <CardDescription>{review.text}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <ReviewStars starsNumber={review.ratting} />
          {/* {[...Array(review.ratting)].map((_, index) => (
            <Star
              key={index}
              fill="currentColor"
              className="size-5 text-yellow-500"
            />
          ))} */}
        </div>
      </CardContent>
    </Card>
  );
};
