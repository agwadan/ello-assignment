import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
query ExampleQuery {
  books {
    title
    author
    coverPhotoURL
    readingLevel
  }
}
`;
