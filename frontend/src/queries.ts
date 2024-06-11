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

export const GET_ALL_BOOKS = gql`
  query ExampleQuery {
    books {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;