import { graphql } from "../../gql";

export const verifyGoogleUserTokenQuery = graphql(`#graphql
    query VerifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }
`);

export const getCurrentUserQuery = graphql(`
    query GetCurrentUser {
        getCurrentUser {
        id
        email
        firstName
        lastName
        profileImageURL
        }
    }
`)