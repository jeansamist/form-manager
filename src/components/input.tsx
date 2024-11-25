import { ComponentProps, FunctionComponent } from "react";
import { ZodType } from "zod";

export type InputProps = ComponentProps<"input"> & {
  schema?: ZodType;
  // form?: UseFormReturn["form"];
};

export const Input: FunctionComponent<InputProps> = ({ form, ...props }) => {
  return <input {...props} />;
};
