
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
    content: string;
}

export interface Chat {
    id: string;
    user_id: string;
    messages?: Nullable<Nullable<Message>[]>;
}

export interface ChatsResult {
    chats?: Nullable<Nullable<Chat>[]>;
}

export interface IQuery {
    chatMessages(chat_id: string): Nullable<ChatsMessagesResult> | Promise<Nullable<ChatsMessagesResult>>;
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

export interface IMutation {
    authenticate(mobile_number: string, password: string): Nullable<UserResult> | Promise<Nullable<UserResult>>;
}

export type ChatsMessagesResult = ChatsResult | Error;
export type UserResult = User | Error;
type Nullable<T> = T | null;
