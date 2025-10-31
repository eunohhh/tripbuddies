import { headers } from "next/headers";

export const getUserFromHeader = async () => {
  const headersList = await headers();
  const user = headersList.get("x-user");

  return user;
};
