export async function getTripById(tripId: string) {
  try {
    const response = await fetch(`/api/trips/${tripId}`);
    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(errorResult.error);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trip 데이터 가져오기 중 오류 발생:', error);
    throw error;
  }
}
