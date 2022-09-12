import { Context } from './context';
import { MaybePromise } from './composer';
import { MiddlewareFn } from './middleware';
export interface SessionStore<T> {
    get: (name: string) => MaybePromise<T | undefined>;
    set: (name: string, value: T) => MaybePromise<void>;
    delete: (name: string) => MaybePromise<void>;
}
interface SessionOptions<S extends object> {
    getSessionKey?: (ctx: Context) => Promise<string | undefined>;
    store?: SessionStore<S>;
}
export interface SessionContext<S extends object> extends Context {
    session?: S;
}
/**
 * Returns middleware that adds `ctx.session` for storing arbitrary state per session key.
 *
 * The default `getSessionKey` is <code>\`${ctx.from.id}:${ctx.chat.id}\`</code>.
 * If either `ctx.from` or `ctx.chat` is `undefined`, default session key and thus `ctx.session` are also `undefined`.
 *
 * Session data is kept only in memory by default,
 * which means that all data will be lost when the process is terminated.
 * If you want to store data across restarts, or share it among workers,
 * you can [install persistent session middleware from npm](https://www.npmjs.com/search?q=telegraf-session),
 * or pass custom `storage`.
 *
 * @example https://github.com/telegraf/telegraf/blob/develop/docs/examples/session-bot.ts
 * @deprecated https://github.com/telegraf/telegraf/issues/1372#issuecomment-782668499
 */
export declare function session<S extends object>(options?: SessionOptions<S>): MiddlewareFn<SessionContext<S>>;
/** @deprecated https://github.com/telegraf/telegraf/issues/1372#issuecomment-782668499 */
export declare class MemorySessionStore<T> implements SessionStore<T> {
    private readonly ttl;
    private readonly store;
    constructor(ttl?: number);
    get(name: string): T | undefined;
    set(name: string, value: T): void;
    delete(name: string): void;
}
export declare function isSessionContext<S extends object>(ctx: Context): ctx is SessionContext<S>;
export {};
//# sourceMappingURL=session.d.ts.map