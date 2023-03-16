import {
	CreateTravelPostMutationVariables,
	CreateTravelPostMutation,
} from '@/src/API'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { API } from 'aws-amplify'
import Head from 'next/head'
import { useState } from 'react'
import { FileUploader, withAuthenticator } from '@aws-amplify/ui-react'
import { createTravelPost } from '@/src/graphql/mutations'

function CreateTravelPost() {
	const [currImgKey, setCurrImgKey] = useState<string | undefined>()

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

			<div className="max-w-2xl  m-auto w-full mt-10 p-4">
				<h2 className="text-cyan-300 text-4xl text-center mb-4">
					Create Travel Post
				</h2>

				<form
					onSubmit={handleSubmit}
					className="form-control grid grid-cols-2 gap-4 max-w-xl m-auto"
				>
					<div className="col-span-2">
						<FileUploader
							accessLevel="public"
							acceptedFileTypes={['image/*']}
							maxFileCount={1}
							shouldAutoProceed
							onSuccess={({ key }) => setCurrImgKey(key)}
						/>
					</div>
					<div className="col-span-2">
						<label className="label">
							<span className="label-text">What is the title?</span>
						</label>
						<input
							type="text"
							required
							name="title"
							placeholder="My amazing event"
							className="input input-secondary input-bordered border-2 p-3 md:text-xl w-full"
						/>
					</div>
					<div className="col-span-2">
						<label className="label">
							<span className="label-text">
								Description (200 character limit)
							</span>
						</label>
						<textarea
							className="textarea textarea-secondary border-2 p-3 md:text-xl w-full"
							cols={30}
							rows={8}
							placeholder="This was amazing because..."
							name="description"
							maxLength={200}
							required
						></textarea>
					</div>
					<div className="col-span-2 text-right">
						<button
							type="submit"
							className="btn btn-secondary py-3 px-6 w-full sm:w-32"
						>
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
