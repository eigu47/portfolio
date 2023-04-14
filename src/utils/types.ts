export type ValidIndex<T extends readonly unknown[]> = Exclude<
  keyof T,
  keyof []
> extends `${infer N extends number}`
  ? N
  : never;

export type Layout<T extends object> = {
  mobile: Partial<T>;
  desktop: Partial<T>;
  default?: Partial<T>;
};
