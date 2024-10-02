export async function leaveTrip(tripId: string, token: string): Promise<Response> {
  try {
    const response = await fetch(`/api/contract/trip/leave/${tripId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || '여정 삭제에 실패했습니다.');
    }
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
}
