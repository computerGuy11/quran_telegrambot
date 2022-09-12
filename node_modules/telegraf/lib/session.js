"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSessionContext = exports.MemorySessionStore = exports.session = void 0;
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
function session(options) {
    var _a, _b;
    const getSessionKey = (_a = options === null || options === void 0 ? void 0 : options.getSessionKey) !== null && _a !== void 0 ? _a : defaultGetSessionKey;
    const store = (_b = options === null || options === void 0 ? void 0 : options.store) !== null && _b !== void 0 ? _b : new MemorySessionStore();
    return async (ctx, next) => {
        const key = await getSessionKey(ctx);
        if (key == null) {
            return await next();
        }
        ctx.session = await store.get(key);
        await next();
        if (ctx.session == null) {
            await store.delete(key);
        }
        else {
            await store.set(key, ctx.session);
        }
    };
}
exports.session = session;
async function defaultGetSessionKey(ctx) {
    var _a, _b;
    const fromId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
    const chatId = (_b = ctx.chat) === null || _b === void 0 ? void 0 : _b.id;
    if (fromId == null || chatId == null) {
        return undefined;
    }
    return `${fromId}:${chatId}`;
}
/** @deprecated https://github.com/telegraf/telegraf/issues/1372#issuecomment-782668499 */
class MemorySessionStore {
    constructor(ttl = Infinity) {
        this.ttl = ttl;
        this.store = new Map();
    }
    get(name) {
        const entry = this.store.get(name);
        if (entry == null) {
            return undefined;
        }
        else if (entry.expires < Date.now()) {
            this.delete(name);
            return undefined;
        }
        return entry.session;
    }
    set(name, value) {
        const now = Date.now();
        this.store.set(name, { session: value, expires: now + this.ttl });
    }
    delete(name) {
        this.store.delete(name);
    }
}
exports.MemorySessionStore = MemorySessionStore;
function isSessionContext(ctx) {
    return 'session' in ctx;
}
exports.isSessionContext = isSessionContext;
