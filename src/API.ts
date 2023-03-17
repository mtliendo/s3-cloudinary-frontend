/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type TravelPostCreateInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  imgKey: string,
};

export type TravelPost = {
  __typename: "TravelPost",
  id: string,
  createdAt: string,
  updatedAt: string,
  title: string,
  description: string,
  imgKey: string,
};

export type TravelPostUpdateInput = {
  id: string,
  title: string,
  description?: string | null,
  imgKey: string,
};

export type CreateTravelPostMutationVariables = {
  input: TravelPostCreateInput,
};

export type CreateTravelPostMutation = {
  createTravelPost?:  {
    __typename: "TravelPost",
    id: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string,
    imgKey: string,
  } | null,
};

export type UpdateTravelPostMutationVariables = {
  input: TravelPostUpdateInput,
};

export type UpdateTravelPostMutation = {
  updateTravelPost?:  {
    __typename: "TravelPost",
    id: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string,
    imgKey: string,
  } | null,
};

export type DeleteTravelPostMutationVariables = {
  id: string,
};

export type DeleteTravelPostMutation = {
  deleteTravelPost?:  {
    __typename: "TravelPost",
    id: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string,
    imgKey: string,
  } | null,
};

export type GetTravelPostQueryVariables = {
  id: string,
};

export type GetTravelPostQuery = {
  getTravelPost?:  {
    __typename: "TravelPost",
    id: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string,
    imgKey: string,
  } | null,
};

export type ListTravelPostsQuery = {
  listTravelPosts:  Array< {
    __typename: "TravelPost",
    id: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string,
    imgKey: string,
  } | null >,
};

export type OnTravelPostCreateSubscription = {
  onTravelPostCreate?:  {
    __typename: "TravelPost",
    id: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string,
    imgKey: string,
  } | null,
};
