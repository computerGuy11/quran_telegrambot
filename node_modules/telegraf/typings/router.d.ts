/** @format */
import { Middleware, MiddlewareObj } from './middleware';
import Context from './context';
declare type NonemptyReadonlyArray<T> = readonly [T, ...T[]];
declare type RouteFn<TContext extends Context> = (ctx: TContext) => {
    route: string;
    context?: Partial<TContext>;
    state?: Partial<TContext['state']>;
} | null;
export declare class Router<C extends Context> implements MiddlewareObj<C> {
    private readonly routeFn;
    handlers: Map<string, Middleware<C>>;
    private otherwiseHandler;
    constructor(routeFn: RouteFn<C>, handlers?: Map<string, Middleware<C>>);
    on(route: string, ...fns: NonemptyReadonlyArray<Middleware<C>>): this;
    otherwise(...fns: NonemptyReadonlyArray<Middleware<C>>): this;
    middleware(): import("./middleware").MiddlewareFn<C>;
}
export {};
//# sourceMappingURL=router.d.ts.map