import { gql } from '@apollo/client/core';

export const USER_AUTHENTICATE = gql`
    mutation authenticate($mobile_number: String!, $password: String!) {
        authenticate(mobile_number: $mobile_number, password: $password) {
            ...on User {
                id
                avatar_url
                fullname
                chat
                token
            }

            ...on Error {
                message
            }
        }
    }
`;