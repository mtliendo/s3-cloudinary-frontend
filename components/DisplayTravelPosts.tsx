import { TravelPost } from '@/src/API'
import { CldImage } from 'next-cloudinary'

export type DisplayTravelPostsProps = {
	travelPosts: TravelPost[] | []
	handlePostSelect?: (post: TravelPost) => void | (() => {})
}
export const DisplayTravelPosts = ({
	travelPosts,
	handlePostSelect = () => {},
}: DisplayTravelPostsProps) => {
	return (
		<main className="flex flex-wrap justify-around">
			{travelPosts.map((post: TravelPost) => {
				return (
					<div
						key={post.id}
						onClick={() => handlePostSelect(post)}
						className="card w-96 bg-base-300 shadow-xl mb-8"
					>
						<figure>
							<CldImage
								className="mask mask-parallelogram"
								crop="fill"
								width="384"
								height="250"
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
	)
}
