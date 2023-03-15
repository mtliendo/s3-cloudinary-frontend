/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type TravelPostInput = {
	id?: string | null
	title: string
	description?: string | null
	imgKey: string
}

export type TravelPost = {
	id: string
	title?: string | null
	description?: string | null
	imgKey?: string | null
}

export type CreateTravelPostMutationVariables = {
	input: TravelPostInput
}

export type CreateTravelPostMutation = {
	createTravelPost?: {
		__typename: 'TravelPost'
		id: string
		title?: string | null
		description?: string | null
		imgKey?: string | null
	} | null
}

export type GetTravelPostQueryVariables = {
	id: string
}

export type GetTravelPostQuery = {
	getTravelPost?: {
		__typename: 'TravelPost'
		id: string
		title?: string | null
		description?: string | null
		imgKey?: string | null
	} | null
}

export type ListTravelPostsQuery = {
	listTravelPosts: Array<{
		__typename: 'TravelPost'
		id: string
		title?: string | null
		description?: string | null
		imgKey?: string | null
	} | null>
}

export type OnTravelPostCreateSubscription = {
	onTravelPostCreate?: {
		__typename: 'TravelPost'
		id: string
		title?: string | null
		description?: string | null
		imgKey?: string | null
	} | null
}
