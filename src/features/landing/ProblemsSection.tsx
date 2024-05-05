import React from "react";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";

export const ProblemsSection = () => {
  return (
    <SectionLayout>
      <h2 className="text-center text-3xl font-bold text-foreground">
        Increase your reviews = Increase your sales
      </h2>

      <div className="m-auto mt-4 flex max-w-3xl gap-6 text-left max-lg:flex-col">
        <ProblemCard
          title="Before get-testimonials.com"
          listText={[
            "Customer don't trust your product",
            "Customer don't make review because it's too long",
            "It's hard to get reviews form customers",
          ]}
          type="before"
        />

        <ProblemCard
          title="After get-testimonials.com"
          listText={[
            "Customers trust your product and paid 💰",
            "You get a lot of reviews because the process is easy",
            "Customer want to give you reviews",
          ]}
          type="after"
        />
      </div>
    </SectionLayout>
  );
};

type ProblemCardProps = {
  type: "before" | "after";
  title: string;
  listText: string[];
};
const ProblemCard = ({ listText, title, type }: ProblemCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col  items-start rounded-lg  p-4 shadow lg:p-8",
        {
          "bg-red-500/50": type === "before",
          "bg-green-500/50": type === "after",
        }
      )}
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <ul className=" mt-2 list-disc">
        {listText.map((text) => (
          <li key={text} className="text-sm ">
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};
