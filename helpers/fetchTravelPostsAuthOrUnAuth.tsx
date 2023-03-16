import { listTravelPosts } from '@/src/graphql/queries'
import { ListTravelPostsQuery, TravelPost } from '@/src/API'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { API } from 'aws-amplify'
import { User } from './types'

// methods like these are really just useful on public pages where a user view data is both an auth and unauth state.
// on private pages wrapped with withAuthenticator HOC, the `user` is passed as props to the component
export const fetchTravelPostsAuthOrUnAuth = async (user: User | null) => {
	const data = (await API.graphql({
		query: listTravelPosts,
		authMode: user ? undefined : 'AWS_IAM', // "undefined" will use the default auth strategy. In src/config.ts this is 'AMAZON_COGNITO_USER_POOLS'
	})) as GraphQLResult<ListTravelPostsQuery>

	const travelPostsData = data.data?.listTravelPosts as TravelPost[]

	return { travelPostsData, user }
}
