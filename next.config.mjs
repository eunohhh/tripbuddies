const PHASE_DEVELOPMENT_SERVER = process.env.NODE_ENV === 'development';
const PHASE_PRODUCTION_BUILD = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pedixhwyfardtsanotrp.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'pbnegzqbzkddsnebarhp.supabase.co',
      },
      {
        protocol: 'http',
        hostname: '**.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.pstatic.net',
      },
      { protocol: 'https', hostname: 'encrypted-tbn3.gstatic.com' },
      { protocol: 'https', hostname: 'example.com' },
    ],
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...fileLoaderRule.resourceQuery.not, /url/],
        },
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import('next-pwa')).default({
      dest: 'public',
      register: true,
      scope: '/',
      sw: '/sw.js',
      // buildExcludes: [/middleware-manifest\.json$/],
      swSrc: '/sw.js',
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};

// const withPWA = withPWAInit({
//   dest: "public",
//   disable: process.env.NODE_ENV === 'development',
//   mode: 'production',
//   buildExcludes: [/middleware-manifest\.json$/],
//   swSrc: 'public/sw.js',
// });

export default nextConfigFunction;
