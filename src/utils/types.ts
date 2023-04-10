export type ValidIndex<T extends readonly unknown[]> = Exclude<
  keyof T,
  keyof []
> extends `${infer N extends number}`
  ? N
  : never;

export type Layout<T = JSX.IntrinsicElements["group"]> = {
  mobile: Partial<T>;
  desktop: Partial<T>;
};
