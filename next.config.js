/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
    typedRoutes: true,
  },
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '/u/**',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
				pathname: '/a/**',
			},
			{
				protocol: 'https',
				hostname: 'platform-lookaside.fbsbx.com',
				port: '',
				pathname: '/platform/profilepic/**',
			},
		],
	},
};

module.exports = nextConfig;
