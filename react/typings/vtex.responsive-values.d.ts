declare module "vtex.responsive-values" {
  // eslint-disable-next-line no-unused-vars
  interface ResponsiveValue<T> {
    tablet?: T;
    phone?: T;
    desktop?: T;
    mobile?: T;
  }

  type MaybeResponsiveValue<T> = ResponsiveValue<T> | T;
  // eslint-disable-next-line no-unused-vars
  const useResponsiveValue: <T>(value: MaybeResponsiveValue<T>) => T;
}
