import {
	CreateTravelPostMutationVariables,
	CreateTravelPostMutation,
} from '@/src/API'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { API } from 'aws-amplify'
import Head from 'next/head'
import { useState } from 'react'
import {
	Button,
	FileUploader,
	Flex,
	Heading,
	TextAreaField,
	TextField,
	useTheme,
	View,
	withAuthenticator,
} from '@aws-amplify/ui-react'
import { createTravelPost } from '@/src/graphql/mutations'
import Link from 'next/link'

function CreateTravelPost() {
	const [currImgKey, setCurrImgKey] = useState<string | undefined>()
	const theme = useTheme()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
	}

	return (
		<>
			<Head>
				<title>Create Travel Post</title>
				<meta name="description" content="Travel Post Application" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h2 className="text-cyan-300 text-2xl text-center">Create Travel Post</h2>

			<div className="md:container md:mx-auto">
				<form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
					<FileUploader
						accessLevel="public"
						acceptedFileTypes={['image/*']}
						maxFileCount={1}
						shouldAutoProceed
						onSuccess={({ key }) => setCurrImgKey(key)}
					/>
					<label className="label">
						<span className="label-text">What is the title?</span>
					</label>
					<input
						type="text"
						required
						name="title"
						placeholder="Type here"
						className="input input-secondary input-bordered w-full max-w-xs"
					/>

					<label className="label">
						<span className="label-text">
							Description (200 character limit)
						</span>
					</label>
					<textarea
						className="textarea textarea-secondary"
						placeholder="Bio"
						name="description"
						maxLength={200}
						required
					></textarea>
					<div className="flex justify-end">
						<button type="submit" className="btn btn-secondary">
							Button
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default withAuthenticator(CreateTravelPost, {
	signUpAttributes: ['email'],
	// hideSignUp: true
})
