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
      }

      ... on Error {
        message
      }
    }
  }
`;

export const NEW_MESSAGE_SUBSCRIPTION = gql`
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
