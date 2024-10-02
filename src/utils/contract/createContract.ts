export async function createContract(tripId: string, userId: string) {
  try {
    const contractData = {
      tripId: tripId,
      userId: userId,
    };

    const response = await fetch('/api/contract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contractData),
    });

    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(errorResult.error);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Contract 생성 중 오류 발생:', error);
    throw error;
  }
}
