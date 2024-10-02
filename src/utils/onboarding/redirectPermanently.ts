'use server';

import { permanentRedirect } from 'next/navigation';

const redirectPermanently = (buddyId: string) => {
  return permanentRedirect(`/profile/${buddyId}`);
};

export default redirectPermanently;
