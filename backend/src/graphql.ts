
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Message {
    id: number;
    user_id: number;
    content: string; 
}

export interface Chat {
    id: number;
    user_id: number;
    messages?: Nullable<Nullable<Message>[]>;
}

export interface IQuery {
    chatMessages(chat_id: number): Nullable<Nullable<Chat>[]> | Promise<Nullable<Nullable<Chat>[]>>;
}

export interface User {
    id: number;
    avatar_url?: Nullable<string>;
    mobile_number: string;
    fullname?: Nullable<string>;
    chat?: Nullable<Nullable<number>[]>;
}

export interface IMutation {
    authenticate(mobile_number: string, password: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
