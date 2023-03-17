import { TravelPost } from '@/src/API'
import Head from 'next/head'
import { useEffect, useReducer } from 'react'
import { Raleway } from 'next/font/google'
import { fetchTravelPostsAuthOrUnAuth } from '../helpers/fetchTravelPostsAuthOrUnAuth'
import { User } from '../helpers/types'
import { DisplayTravelPosts } from '@/components/DisplayTravelPosts'
import { listenForPostsAuthOrUnAuth } from '@/helpers/listenForPostsAuthOrUnauth'
import { ZenObservable } from 'zen-observable-ts'

const eduSaBeginner = Raleway({ subsets: ['latin'] })

interface State {
	user: User | null
	travelPosts: TravelPost[]
}

// Using a union type
type ActionType = 'getUserAndtravelPostsData'

interface Action {
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

			<div
				className="hero min-h-screen mb-12"
				style={{
					backgroundImage: `url("https://res.cloudinary.com/focusotter-tuts/image/upload/e_blur:214,f_auto,q_auto/v1678928041/lgbmuyncmwhbstp12cdn.jpg")`,
				}}
			>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1
							className={`text-5xl mb-5 font-bold text-cyan-300 ${eduSaBeginner.className}`}
						>
							The Travelling Dev
						</h1>
						<p className="mb-5 rounded-md p-1 text-2xl text-blue-200">
							A journey to see the world through the lens of a Developer
							Advocate🥑
						</p>
					</div>
				</div>
			</div>
			<DisplayTravelPosts travelPosts={state.travelPosts} />
		</>
	)
}
