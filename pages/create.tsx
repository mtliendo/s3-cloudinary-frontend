import {
	CreateTravelPostMutationVariables,
	CreateTravelPostMutation,
	ListTravelPostsQuery,
	TravelPost,
} from '@/src/API'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { API } from 'aws-amplify'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { FileUploader, withAuthenticator } from '@aws-amplify/ui-react'
import { createTravelPost } from '@/src/graphql/mutations'
import { listTravelPosts } from '@/src/graphql/queries'
import { DisplayTravelPosts } from '@/components/DisplayTravelPosts'
import { NavBar } from '@/components/NavBar'
import { User } from '@/helpers/types'
import { TravelPostForm } from '@/components/TravelPostForm'

type CreateTravelPostProps = {
	user: User
}
function CreateTravelPost({ user }: CreateTravelPostProps) {
	const [currImgKey, setCurrImgKey] = useState<string | undefined>()
	const [travelPosts, setTravelPosts] = useState<TravelPost[] | []>([])
	const [currTravelPost, setCurrTravelPost] = useState<TravelPost | undefined>()
	console.log('the current post', currTravelPost)
	useEffect(() => {
		const fetchTravelPosts = async () => {
			const data = (await API.graphql({
				query: listTravelPosts,
			})) as GraphQLResult<ListTravelPostsQuery>

			return data.data?.listTravelPosts as TravelPost[]
		}

		fetchTravelPosts().then((travelPostsData) =>
			setTravelPosts(travelPostsData)
		)
	}, [])

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const title = formData.get('title')?.valueOf()
		const description = formData.get('description')?.valueOf()

		const createTravelRes = (await API.graphql({
			query: createTravelPost,
			variables: {
				input: {
					title,
					description,
					imgKey: currImgKey,
				},
			} as CreateTravelPostMutationVariables,
		})) as GraphQLResult<CreateTravelPostMutation>

		const form = e.currentTarget
		form.reset()
	}

	const handlePostSelect = (post: TravelPost) => {
		setCurrTravelPost(post)
	}

	const handleFileUploadSuccess = (key: string) => {
		setCurrImgKey(key)
	}

	return (
		<>
			<Head>
				<title>Create Travel Post</title>
				<meta name="description" content="Travel Post Application" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar isAuthPage user={user} />
			<div className="max-w-2xl  m-auto w-full mt-10 mb-8 p-4">
				<h2 className="text-cyan-300 text-4xl text-center mb-4">
					Create Travel Post
				</h2>

				<TravelPostForm
					handleFormSubmit={handleFormSubmit}
					handleFileUploadSuccess={handleFileUploadSuccess}
				/>
			</div>
			<DisplayTravelPosts
				travelPosts={travelPosts}
				handlePostSelect={handlePostSelect}
			/>
		</>
	)
}

export default withAuthenticator(CreateTravelPost, {
	signUpAttributes: ['email'],
	// hideSignUp: true
})
