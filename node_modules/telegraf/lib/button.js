"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webApp = exports.login = exports.pay = exports.game = exports.switchToCurrentChat = exports.switchToChat = exports.callback = exports.url = exports.pollRequest = exports.locationRequest = exports.contactRequest = exports.text = void 0;
function text(text, hide = false) {
    return { text, hide };
}
exports.text = text;
function contactRequest(text, hide = false) {
    return { text, request_contact: true, hide };
}
exports.contactRequest = contactRequest;
function locationRequest(text, hide = false) {
    return { text, request_location: true, hide };
}
exports.locationRequest = locationRequest;
function pollRequest(text, type, hide = false) {
    return { text, request_poll: { type }, hide };
}
exports.pollRequest = pollRequest;
function url(text, url, hide = false) {
    return { text, url, hide };
}
exports.url = url;
function callback(text, data, hide = false) {
    return { text, callback_data: data, hide };
}
exports.callback = callback;
function switchToChat(text, value, hide = false) {
    return { text, switch_inline_query: value, hide };
}
exports.switchToChat = switchToChat;
function switchToCurrentChat(text, value, hide = false) {
    return { text, switch_inline_query_current_chat: value, hide };
}
exports.switchToCurrentChat = switchToCurrentChat;
function game(text, hide = false) {
    return { text, callback_game: {}, hide };
}
exports.game = game;
function pay(text, hide = false) {
    return { text, pay: true, hide };
}
exports.pay = pay;
function login(text, url, opts = {}, hide = false) {
    return {
        text,
        login_url: { ...opts, url },
        hide,
    };
}
exports.login = login;
function webApp(text, url, hide = false) {
    return {
        text,
        web_app: { url },
        hide,
    };
}
exports.webApp = webApp;
