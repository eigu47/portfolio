export type ValidIndex<T extends readonly unknown[]> = Exclude<
  keyof T,
  keyof []
> extends `${infer N extends number}`
  ? N
  : never;

// export type IndexUnion<T extends readonly unknown[]> = {
//   [K in keyof T]: K extends `${infer N extends number}` ? N : never;
// }[number];
