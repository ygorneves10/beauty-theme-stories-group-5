declare module "vtex.styleguide" {
  // eslint-disable-next-line no-unused-vars
  import { ComponentType } from "react";

  export const Input: ComponentType<InputProps>;

  interface InputProps {
    [key: string]: any;
  }
}
