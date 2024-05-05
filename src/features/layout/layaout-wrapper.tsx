import { twx } from "@/lib/twx";

export const LayoutWrapper = twx.div((props) => [
  ` max-w-5xl w-full  mx-auto flex flex-col gap-4 px-4 py-8`,
]);

export const LayoutTitle = twx.h1((props) => ["text-4xl font-bold"]);

export const LayoutDescription = twx.p((props) => [
  "text-lg text-muted-foreground",
]);
