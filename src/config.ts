export const config = {
	aws_project_region: process.env.region,
	Auth: {
		region: process.env.region,
		userPoolId: process.env.userpoolId,
		userPoolWebClientId: process.env.userPoolWebClientId,
		identityPoolId: process.env.identityPoolId,
	},
	Storage: {
		AWSS3: {
			bucket: process.env.bucket,
			region: process.env.region,
		},
	},
	aws_appsync_graphqlEndpoint: process.env.appSyncURL,
	aws_appsync_region: process.env.region,
	aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
}
