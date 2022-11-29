import { gql } from "@apollo/client/core";

export const USER_AUTHENTICATE = gql`
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

export const SEND_MESSAGE = gql`
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

export const NEW_MESSAGE_SUBSCRIPTION = gql`
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

export const FETCH_ALL_CHATS = gql`
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

export const FETCH_CHAT_BY_ID = gql`
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
