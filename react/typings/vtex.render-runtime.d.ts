/* Typings for `render-runtime` */
declare module "vtex.render-runtime" {
  // eslint-disable-next-line no-unused-vars
  import { Component, ComponentType, ReactElement, ReactType } from "react";

  export interface NavigationOptions {
    page: string;
    params?: any;
  }

  export interface RenderContextProps {
    runtime: {
      navigate: (options: NavigationOptions) => void;
    };
  }

  interface ExtensionPointProps {
    id: string;
    [key: string]: any;
  }

  export const ExtensionPoint: ComponentType<ExtensionPointProps>;

  interface ChildBlockProps {
    id: string;
  }

  export const ChildBlock: ComponentType<ChildBlockProps>;
  // eslint-disable-next-line no-unused-vars
  export const useChildBlock: (opts: { id: string }) => {} | null;

  export const Helmet: ReactElement;
  export const Link: ReactType;
  export const NoSSR: ComponentType<any>;
  export const useSSR: () => {};
  export const RenderContextConsumer: ReactElement;
  export const canUseDOM: boolean;
  export const withRuntimeContext: <TOriginalProps extends {}>(
    Component: ComponentType<TOriginalProps & RenderContextProps>
  ) => ComponentType<TOriginalProps>;
}
