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
			<View margin={{ base: theme.tokens.space.medium }}>
				<nav>
					<Link href={'/'}>Home</Link>
				</nav>
				<main>
					<View
						as="section"
						marginBottom={{
							base: theme.tokens.space.medium,
							large: theme.tokens.space.xxxl,
						}}
					>
						<Heading textAlign={'center'} level={3}>
							Create Travel Post
						</Heading>
					</View>
					<View
						as="section"
						maxWidth={{ base: '400px', large: '500px' }}
						margin="0 auto"
					>
						<FileUploader
							accessLevel="public"
							acceptedFileTypes={['image/*']}
							maxFileCount={1}
							shouldAutoProceed
							onSuccess={({ key }) => setCurrImgKey(key)}
						/>
						<form onSubmit={handleSubmit}>
							<TextField
								required
								label="Title"
								name="title"
								marginBlock={{
									base: theme.tokens.space.medium,
									large: theme.tokens.space.large,
								}}
							/>
							<TextAreaField
								marginBlock={{
									base: theme.tokens.space.medium,
									large: theme.tokens.space.large,
								}}
								maxLength={200}
								required
								label="Description (200 character limit)"
								name="description"
							/>
							<Flex
								marginTop={theme.tokens.space.medium}
								justifyContent={'flex-end'}
							>
								<Button type="submit" variation="primary">
									Submit
								</Button>
							</Flex>
						</form>
					</View>
				</main>
			</View>
		</>
	)
}

export default withAuthenticator(CreateTravelPost, {
	signUpAttributes: ['email'],
	// hideSignUp: true,
})
