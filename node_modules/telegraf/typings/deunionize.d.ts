export declare type PropOr<T extends object | undefined, P extends string | symbol | number, D = undefined> = T extends Partial<Record<P, unknown>> ? T[P] : D;
export declare type UnionKeys<T> = T extends unknown ? keyof T : never;
declare type AddOptionalKeys<K extends PropertyKey> = {
    readonly [P in K]?: undefined;
};
/**
 * @see https://millsp.github.io/ts-toolbelt/modules/union_strict.html
 */
export declare type Deunionize<B extends object | undefined, T extends B = B> = T extends object ? T & AddOptionalKeys<Exclude<UnionKeys<B>, keyof T>> : T;
/**
 * Expose properties from all union variants.
 * @see https://github.com/telegraf/telegraf/issues/1388#issuecomment-791573609
 * @see https://millsp.github.io/ts-toolbelt/modules/union_strict.html
 */
export declare function deunionize<T extends object | undefined>(t: T): Deunionize<T, T>;
export {};
//# sourceMappingURL=deunionize.d.ts.map