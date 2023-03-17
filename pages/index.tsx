import { TravelPost } from '@/src/API'
import Head from 'next/head'
import { useEffect, useReducer } from 'react'
import { fetchTravelPostsAuthOrUnAuth } from '../helpers/fetchTravelPostsAuthOrUnAuth'
import { User } from '../helpers/types'
import { DisplayTravelPosts } from '@/components/DisplayTravelPosts'
import { listenForPostsAuthOrUnAuth } from '@/helpers/listenForPostsAuthOrUnauth'
import { ZenObservable } from 'zen-observable-ts'
import { NavBar } from '@/components/NavBar'
import { Hero } from '@/components/Hero'

type State = {
	user: User | null
	travelPosts: TravelPost[]
}

// Using a union type
type ActionType = 'getUserAndtravelPostsData'

type Action = {
	type: ActionType
	payload?: any // Replace 'any' with the specific payload type if required
}

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'getUserAndtravelPostsData':
			return {
				travelPosts: action.payload.travelPostsData,
				user: action.payload.user,
			}

		default:
			return { travelPosts: [], user: null }
	}
}

export default function Home() {
	const [state, dispatch] = useReducer(reducer, { user: null, travelPosts: [] })

	useEffect(() => {
		let sub: ZenObservable.Subscription | undefined
		listenForPostsAuthOrUnAuth().then((currentSub) => {
			sub = currentSub
		})

		// Stop receiving data updates from the subscription
		return () => {
			// if-check since in dev useEffect gets called twice. Doing this check prevents "unsubscribe" from being called before the websocket has been opened.
			if (sub) {
				sub.unsubscribe()
			}
		}
	}, [])

	useEffect(() => {
		fetchTravelPostsAuthOrUnAuth().then(({ travelPostsData, user }) => {
			dispatch({
				type: 'getUserAndtravelPostsData',
				payload: { travelPostsData, user },
			})
		})
	}, [])

	return (
		<>
			<Head>
				<title>Travel Posts</title>
				<meta name="description" content="Travel Posts" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar user={state.user} />
			<Hero />
			<DisplayTravelPosts travelPosts={state.travelPosts} />
		</>
	)
}
