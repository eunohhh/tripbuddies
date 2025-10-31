import { headers } from "next/headers";

export const getPathnameServer = async () => {
	const headersList = await headers();
	const pathname = headersList.get("x-pathname");
	const queryParams = headersList.get("x-funnel");

	return { pathname, queryParams };
};
