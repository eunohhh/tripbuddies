export const defaultMetaData = {
  metadataBase: new URL('https://nbc-final.vercel.app'),
  title: 'TripBuddies',
  description: 'TripBuddies',
  generator: 'Next.js',
  applicationName: 'TripBuddies',
  keywords: ['tripbuddies', 'trip', 'buddy'],
  authors: [{ name: 'TripBuddies', url: 'https://nbc-final.vercel.app' }],
  creator: 'TripBuddies',
  publisher: 'TripBuddies',
  alternates: {
    canonical: '/',
    languages: {
      'ko-KR': '/',
    },
  },
  openGraph: {
    title: 'TripBuddies',
    description: 'TripBuddies',
    url: 'https://nbc-final.vercel.app',
    siteName: 'TripBuddies',
    images: [
      {
        url: '/test_city2.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
  icons: {
    icon: '/favicon/favicon-32x32.png',
    shortcut: '/favicon/favicon-32x32.png',
    apple: '/favicon/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/favicon/apple-touch-icon.png',
    },
  },
};
