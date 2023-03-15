export const config = {
	aws_project_region: process.env.aws_region || 'us-east-1',
	Auth: {
		region: process.env.aws_region || 'us-east-1',
		userPoolId: process.env.userPoolId || 'us-east-1_QY92WFIZD',
		userPoolWebClientId:
			process.env.userPoolWebClientId || '5u33vimotgl85cijvc6u7lf2hh',
		identityPoolId:
			process.env.identityPoolId ||
			'us-east-1:d2c8bdce-648e-41c5-9a0b-dbba81e1c997',
	},
	Storage: {
		AWSS3: {
			bucket: process.env.bucket || 'travel-viewer-app-develop-bucket',
			region: process.env.aws_region || 'us-east-1',
		},
	},
	aws_appsync_graphqlEndpoint:
		process.env.aws_appsync_graphqlEndpoint ||
		'https://i56hfsin4bgmzluqvvcohiohwa.appsync-api.us-east-1.amazonaws.com/graphql',
	aws_appsync_region: process.env.aws_region || 'us-east-1',
	aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
}
