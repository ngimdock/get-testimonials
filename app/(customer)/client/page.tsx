import type { PageParams } from "@/types/next";

export default async function RoutePage(props: PageParams<{}>) {
  return <p>Hello world</p>;
}
