import { NavBar } from '@/components/NavBar'
import { withAuthenticator } from '@aws-amplify/ui-react'

const Profile = () => {
	return (
		<>
			<NavBar user={null} />
			<pre>
				<code>{JSON.stringify('THE USER DATA FROM THE DB')}</code>
			</pre>
		</>
	)
}

export default withAuthenticator(Profile)
