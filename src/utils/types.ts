export type ValidIndex<T extends readonly unknown[]> = Exclude<
  keyof T,
  keyof []
> extends `${infer N extends number}`
  ? N
  : never;
