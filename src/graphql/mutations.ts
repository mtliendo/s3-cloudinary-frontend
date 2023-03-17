/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTravelPost = /* GraphQL */ `
  mutation CreateTravelPost($input: TravelPostCreateInput!) {
    createTravelPost(input: $input) {
      id
      createdAt
      updatedAt
      title
      description
      imgKey
    }
  }
`;
export const updateTravelPost = /* GraphQL */ `
  mutation UpdateTravelPost($input: TravelPostUpdateInput!) {
    updateTravelPost(input: $input) {
      id
      createdAt
      updatedAt
      title
      description
      imgKey
    }
  }
`;
export const deleteTravelPost = /* GraphQL */ `
  mutation DeleteTravelPost($id: ID!) {
    deleteTravelPost(id: $id) {
      id
      createdAt
      updatedAt
      title
      description
      imgKey
    }
  }
`;
