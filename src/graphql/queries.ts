/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTravelPost = /* GraphQL */ `
  query GetTravelPost($id: ID!) {
    getTravelPost(id: $id) {
      id
      createdAt
      updatedAt
      title
      description
      imgKey
    }
  }
`;
export const listTravelPosts = /* GraphQL */ `
  query ListTravelPosts {
    listTravelPosts {
      id
      createdAt
      updatedAt
      title
      description
      imgKey
    }
  }
`;
