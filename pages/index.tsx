import { TravelPost } from '@/src/API'
import Head from 'next/head'
import { useEffect, useReducer } from 'react'
import { CldImage } from 'next-cloudinary'
import { Raleway } from 'next/font/google'
import Link from 'next/link'
import { checkCurrentUser } from '../helpers/checkCurrentUser'
import { fetchTravelPostsAuthOrUnAuth } from '../helpers/fetchTravelPostsAuthOrUnAuth'
import { User } from '../helpers/types'

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
		checkCurrentUser()
			.then(fetchTravelPostsAuthOrUnAuth)
			.then(({ travelPostsData, user }) => {
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
			<div className="navbar bg-primary text-primary-content">
				<Link href={'/'} className="btn btn-ghost normal-case text-xl">
					Home
				</Link>
			</div>
			<div
				className="hero min-h-screen mb-12"
				style={{
					backgroundImage: `url("https://res.cloudinary.com/focusotter-tuts/image/upload/e_blur:214/v1678928041/lgbmuyncmwhbstp12cdn.jpg")`,
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
			<main className="flex flex-wrap justify-around">
				{state.travelPosts?.map((post: TravelPost) => {
					return (
						<div key={post.id} className="card w-96 bg-base-300 shadow-xl mb-8">
							<figure>
								<CldImage
									width="384"
									height="250"
									crop="fill"
									src={`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER}/public/${post.imgKey}`}
									alt={post.description!}
								/>
							</figure>
							<div className="card-body">
								<h2 className="card-title">{post.title}</h2>
								<p>{post.description}</p>
							</div>
						</div>
					)
				})}
			</main>
		</>
	)
}
