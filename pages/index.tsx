import { listTravelPosts } from '@/src/graphql/queries'
import { ListTravelPostsQuery, TravelPost } from '@/src/API'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { API, Auth } from 'aws-amplify'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary'
import {
	Card,
	Flex,
	Heading,
	Text,
	useTheme,
	View,
} from '@aws-amplify/ui-react'
import { Edu_SA_Beginner } from 'next/font/google'
const inter = Edu_SA_Beginner({ subsets: ['latin'] })
const fetchTravelList = async (isAuth: boolean) => {
	const data = (await API.graphql({
		query: listTravelPosts,
		authMode: isAuth ? undefined : 'AWS_IAM',
	})) as GraphQLResult<ListTravelPostsQuery>

	const travelPostsData = data.data?.listTravelPosts as TravelPost[]

	return travelPostsData
}

export default function Home() {
	const [travelPosts, setTravelPosts] = useState<TravelPost[] | []>([])
	const [currUser, setCurrUser] = useState<{} | null>(null)
	const theme = useTheme()

	const fetchCurrentUser = async () => {
		let user
		try {
			user = await Auth.currentAuthenticatedUser()
		} catch (e) {
			user = null
		}
		setCurrUser(user)
		return user
	}

	useEffect(() => {
		fetchCurrentUser()
			.then(fetchTravelList)
			.then((fetchedTravelPosts) => {
				setTravelPosts(fetchedTravelPosts)
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
			<Flex
				direction={'column'}
				backgroundColor="white"
				width="100vw"
				height="20rem"
				justifyContent={'center'}
				alignItems="center"
			>
				<Heading
					maxWidth={{ base: '90%' }}
					className={inter.className}
					level={1}
					textAlign="center"
				>
					The Travelling Dev ✈️
				</Heading>
				<Text
					textAlign={'center'}
					fontSize={theme.tokens.fontSizes.large}
					maxWidth={{ base: '90%' }}
				>
					A journey to see the world through the lens of a Developer Advocate🥑
				</Text>
			</Flex>
			<View
				as="main"
				maxWidth={{ base: '400px', large: '500px' }}
				margin="0 auto"
			>
				<Flex
					justifyContent={'space-between'}
					marginTop={theme.tokens.space.large}
				>
					{travelPosts.map((post: TravelPost) => {
						return (
							<Card key={post.id} variation="elevated" maxWidth={'300px'}>
								<Flex justifyContent={'center'}>
									<CldImage
										width="250"
										height="250"
										crop="thumb"
										src={`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER}/public/${post.imgKey}`}
										alt={post.description!}
									/>
								</Flex>
								<Heading marginBlock={theme.tokens.space.medium} level={4}>
									{post.title}
								</Heading>
								<Text>{post.description}</Text>
							</Card>
						)
					})}
				</Flex>
			</View>
		</>
	)
}
