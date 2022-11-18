import client from "src/client.ts";
import type {
        MutationOptions, SubscriptionOptions
      } from "@apollo/client";
import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import gql from "graphql-tag"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AllChatsResult = ChatsResult | Error;

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['ID'];
  messages?: Maybe<Array<Maybe<Message>>>;
  user_id: Scalars['ID'];
};

export type ChatsMessagesResult = Chat | Error;

export type ChatsResult = {
  __typename?: 'ChatsResult';
  result?: Maybe<Array<Maybe<Chat>>>;
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  chat_id: Scalars['ID'];
  content: Scalars['String'];
  created_at?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticate?: Maybe<UserResult>;
  sendMessage?: Maybe<SentMessageResult>;
};


export type MutationAuthenticateArgs = {
  mobile_number: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSendMessageArgs = {
  chat_id: Scalars['ID'];
  content?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  chat?: Maybe<ChatsMessagesResult>;
  chats?: Maybe<AllChatsResult>;
};


export type QueryChatArgs = {
  chat_id: Scalars['ID'];
};

export type SentMessageResult = Error | Message;

export type Subscription = {
  __typename?: 'Subscription';
  newMessage?: Maybe<SentMessageResult>;
};

export type User = {
  __typename?: 'User';
  avatar_url?: Maybe<Scalars['String']>;
  chat?: Maybe<Array<Maybe<Scalars['ID']>>>;
  fullname?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mobile_number: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};

export type UserResult = Error | User;

export type AuthenticateMutationVariables = Exact<{
  mobile_number: Scalars['String'];
  password: Scalars['String'];
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate?: { __typename?: 'Error', message: string } | { __typename?: 'User', id: string, avatar_url?: string | null, fullname?: string | null, chat?: Array<string | null> | null, token?: string | null } | null };

export type SendMessageMutationVariables = Exact<{
  chat_id: Scalars['ID'];
  content: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'Error', message: string } | { __typename?: 'Message', id: string } | null };

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage?: { __typename?: 'Error' } | { __typename?: 'Message', id: string, chat_id: string, content: string, user?: { __typename?: 'User', id: string, avatar_url?: string | null } | null } | null };


export const AuthenticateDoc = gql`
    mutation authenticate($mobile_number: String!, $password: String!) {
  authenticate(mobile_number: $mobile_number, password: $password) {
    ... on User {
      id
      avatar_url
      fullname
      chat
      token
    }
    ... on Error {
      message
    }
  }
}
    `;
export const SendMessageDoc = gql`
    mutation sendMessage($chat_id: ID!, $content: String!) {
  sendMessage(chat_id: $chat_id, content: $content) {
    ... on Message {
      id
    }
    ... on Error {
      message
    }
  }
}
    `;
export const NewMessageDoc = gql`
    subscription newMessage {
  newMessage {
    ... on Message {
      id
      chat_id
      content
      user {
        id
        avatar_url
      }
    }
  }
}
    `;
export const authenticate = (
            options: Omit<
              MutationOptions<any, AuthenticateMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<AuthenticateMutation, AuthenticateMutationVariables>({
              mutation: AuthenticateDoc,
              ...options,
            });
            return m;
          }
export const sendMessage = (
            options: Omit<
              MutationOptions<any, SendMessageMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<SendMessageMutation, SendMessageMutationVariables>({
              mutation: SendMessageDoc,
              ...options,
            });
            return m;
          }
export const newMessage = (
            options: Omit<SubscriptionOptions<NewMessageSubscriptionVariables>, "query">
          ) => {
            const q = client.subscribe<NewMessageSubscription, NewMessageSubscriptionVariables>(
              {
                query: NewMessageDoc,
                ...options,
              }
            )
            return q;
          }