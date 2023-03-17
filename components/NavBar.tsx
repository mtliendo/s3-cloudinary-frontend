import { User } from '@/helpers/types'
import { Auth } from 'aws-amplify'
import Link from 'next/link'
import { useRouter } from 'next/router'

type NavBarProps = {
	isAuthPage?: boolean
	user: User | null
}
export const NavBar = ({ isAuthPage, user }: NavBarProps) => {
	const router = useRouter()

	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<Link href={'/'} className="btn btn-ghost normal-case text-xl">
					Home
				</Link>
			</div>
			<div className="flex-none gap-2">
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
						{user ? (
							<div className="avatar">
								<div className="w-10 rounded-full">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src="https://github.com/mtliendo.png?size=100"
										alt="github profile pic"
									/>
								</div>
							</div>
						) : (
							<div className="avatar placeholder">
								<div className="bg-neutral-focus text-neutral-content rounded-full w-10">
									<span className="text-3xl">?</span>
								</div>
							</div>
						)}
					</label>
					<ul
						tabIndex={0}
						className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
					>
						{isAuthPage && (
							<>
								<li>
									<Link href="/profile" className="justify-between">
										Profile
									</Link>
								</li>
								<li>
									<button
										onClick={() => Auth.signOut().then(() => router.push('/'))}
									>
										Logout
									</button>
								</li>
							</>
						)}
						<li>{!isAuthPage && <Link href={'/create'}>Create Post</Link>}</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
