import { Star } from "lucide-react";
import React from "react";

export const ReviewStars = ({ starsNumber }: { starsNumber: number }) => {
  const filledStars = Math.floor(starsNumber);
  const unfilledStars = 5 - filledStars;

  return (
    <div className="flex items-center space-x-1">
      {[...Array(filledStars)].map((_, index) => (
        <Star fill="currentColor" className="text-yellow-500" key={index} />
      ))}
      {[...Array(unfilledStars)].map((_, index) => (
        <Star className="text-yellow-500" key={index} />
      ))}
    </div>
  );
};
