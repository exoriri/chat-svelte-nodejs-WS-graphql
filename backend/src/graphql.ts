
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Message {
    id: string;
    user_id: string;
    chat_id: string;
    content: string;
    created_at?: Nullable<string>;
}

export interface Chat {
    id: string;
    user_id: string;
    messages?: Nullable<Nullable<Message>[]>;
}

export interface ChatsResult {
    result?: Nullable<Nullable<Chat>[]>;
}

export interface IQuery {
    chat(chat_id: string): Nullable<ChatsMessagesResult> | Promise<Nullable<ChatsMessagesResult>>;
    chats(): Nullable<AllChatsResult> | Promise<Nullable<AllChatsResult>>;
}

export interface IMutation {
    sendMessage(chat_id: string, content?: Nullable<string>): Nullable<SentMessageResult> | Promise<Nullable<SentMessageResult>>;
    authenticate(mobile_number: string, password: string): Nullable<UserResult> | Promise<Nullable<UserResult>>;
}

export interface ISubscription {
    newMessage(): Nullable<SentMessageResult> | Promise<Nullable<SentMessageResult>>;
}

export interface Error {
    message: string;
}

export interface User {
    id: string;
    avatar_url?: Nullable<string>;
    mobile_number: string;
    fullname?: Nullable<string>;
    chat?: Nullable<Nullable<string>[]>;
    token?: Nullable<string>;
}

export type ChatsMessagesResult = Chat | Error;
export type AllChatsResult = ChatsResult | Error;
export type SentMessageResult = Message | Error;
export type UserResult = User | Error;
type Nullable<T> = T | null;
