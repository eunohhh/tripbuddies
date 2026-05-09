"use server";

import { permanentRedirect } from "next/navigation";

const redirectPermanently = async (buddyId: string) => {
  return await permanentRedirect(`/profile/${buddyId}`);
};

export default redirectPermanently;
