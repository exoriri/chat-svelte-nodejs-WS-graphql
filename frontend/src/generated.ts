import client from "src/client.ts";
import type {
        ApolloQueryResult, ObservableQuery, WatchQueryOptions, QueryOptions, MutationOptions, SubscriptionOptions
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
  user: User;
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


export type SubscriptionNewMessageArgs = {
  chat_id: Scalars['ID'];
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


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'Error', message: string } | { __typename?: 'Message', id: string, content: string } | null };

export type NewMessageSubscriptionVariables = Exact<{
  chat_id: Scalars['ID'];
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage?: { __typename?: 'Error' } | { __typename?: 'Message', id: string, chat_id: string, content: string, user?: { __typename?: 'User', id: string, avatar_url?: string | null } | null } | null };

export type ChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatsQuery = { __typename?: 'Query', chats?: { __typename?: 'ChatsResult', result?: Array<{ __typename?: 'Chat', id: string, user: { __typename?: 'User', id: string, fullname?: string | null, avatar_url?: string | null }, messages?: Array<{ __typename?: 'Message', id: string, chat_id: string, content: string, created_at?: string | null, user?: { __typename?: 'User', id: string, avatar_url?: string | null } | null } | null> | null } | null> | null } | { __typename?: 'Error', message: string } | null };

export type ChatQueryVariables = Exact<{
  chat_id: Scalars['ID'];
}>;


export type ChatQuery = { __typename?: 'Query', chat?: { __typename?: 'Chat', id: string, user: { __typename?: 'User', id: string, avatar_url?: string | null }, messages?: Array<{ __typename?: 'Message', id: string, content: string, user?: { __typename?: 'User', id: string, avatar_url?: string | null } | null } | null> | null } | { __typename?: 'Error', message: string } | null };


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
      content
    }
    ... on Error {
      message
    }
  }
}
    `;
export const NewMessageDoc = gql`
    subscription newMessage($chat_id: ID!) {
  newMessage(chat_id: $chat_id) {
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
export const ChatsDoc = gql`
    query chats {
  chats {
    ... on ChatsResult {
      result {
        id
        user {
          id
          fullname
          avatar_url
        }
        messages {
          id
          user {
            id
            avatar_url
          }
          chat_id
          content
          created_at
        }
      }
    }
    ... on Error {
      message
    }
  }
}
    `;
export const ChatDoc = gql`
    query chat($chat_id: ID!) {
  chat(chat_id: $chat_id) {
    ... on Chat {
      id
      user {
        id
        avatar_url
      }
      messages {
        id
        user {
          id
          avatar_url
        }
        content
      }
    }
    ... on Error {
      message
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
export const chats = (
            options: Omit<
              WatchQueryOptions<ChatsQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<ChatsQuery> & {
              query: ObservableQuery<
                ChatsQuery,
                ChatsQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: ChatsDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<ChatsQuery> & {
                query: ObservableQuery<
                  ChatsQuery,
                  ChatsQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
              export const Asyncchats = (
                options: Omit<
                  QueryOptions<ChatsQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<ChatsQuery>({query: ChatsDoc, ...options})
              }
            
export const chat = (
            options: Omit<
              WatchQueryOptions<ChatQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<ChatQuery> & {
              query: ObservableQuery<
                ChatQuery,
                ChatQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: ChatDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<ChatQuery> & {
                query: ObservableQuery<
                  ChatQuery,
                  ChatQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
              export const Asyncchat = (
                options: Omit<
                  QueryOptions<ChatQueryVariables>,
                  "query"
                >
              ) => {
                return client.query<ChatQuery>({query: ChatDoc, ...options})
              }
            