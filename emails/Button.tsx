import { Button as ReactEmailButton } from "@react-email/components";

import { ComponentPropsWithoutRef } from "react";

export const Button = (
  props: ComponentPropsWithoutRef<typeof ReactEmailButton>
) => {
  return (
    <ReactEmailButton
      {...props}
      className="mt-4 inline-block rounded bg-blue-500 px-6 py-3 text-center font-semibold text-white"
    />
  );
};
