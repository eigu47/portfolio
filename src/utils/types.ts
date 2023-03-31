export type LengthToUnion<T extends readonly unknown[]> = {
  [K in keyof T]: K extends `${infer N extends number}` ? N : never;
}[number];
