import { InlineKeyboardButton, KeyboardButton } from './core/types/typegram';
declare type Hideable<B> = B & {
    hide: boolean;
};
export declare function text(text: string, hide?: boolean): Hideable<KeyboardButton.CommonButton>;
export declare function contactRequest(text: string, hide?: boolean): Hideable<KeyboardButton.RequestContactButton>;
export declare function locationRequest(text: string, hide?: boolean): Hideable<KeyboardButton.RequestLocationButton>;
export declare function pollRequest(text: string, type?: 'quiz' | 'regular', hide?: boolean): Hideable<KeyboardButton.RequestPollButton>;
export declare function url(text: string, url: string, hide?: boolean): Hideable<InlineKeyboardButton.UrlButton>;
export declare function callback(text: string, data: string, hide?: boolean): Hideable<InlineKeyboardButton.CallbackButton>;
export declare function switchToChat(text: string, value: string, hide?: boolean): Hideable<InlineKeyboardButton.SwitchInlineButton>;
export declare function switchToCurrentChat(text: string, value: string, hide?: boolean): Hideable<InlineKeyboardButton.SwitchInlineCurrentChatButton>;
export declare function game(text: string, hide?: boolean): Hideable<InlineKeyboardButton.GameButton>;
export declare function pay(text: string, hide?: boolean): Hideable<InlineKeyboardButton.PayButton>;
export declare function login(text: string, url: string, opts?: {
    forward_text?: string;
    bot_username?: string;
    request_write_access?: boolean;
}, hide?: boolean): Hideable<InlineKeyboardButton.LoginButton>;
export declare function webApp(text: string, url: string, hide?: boolean): Hideable<InlineKeyboardButton.WebAppButton>;
export {};
//# sourceMappingURL=button.d.ts.map