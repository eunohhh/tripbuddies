import { BuddyTripStory } from '@/types/Home.type';
import fetchWrapper from '@/utils/api/fetchWrapper';

export async function getBuddyTripStory() {
    const url = `/api/home`;
    try {
        const data = await fetchWrapper<BuddyTripStory>(url, {
            method: 'GET',
            cache: 'no-store',
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}
