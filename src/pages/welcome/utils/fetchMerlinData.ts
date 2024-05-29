const MERLIN_ENDPOINT_URL = 'http://localhost:3005/merlin/query';

export default async function fetchMerlinData(
  sqlQuery: string,
  onData: (data: object) => void,
) {
  try {
    const response = await fetch(MERLIN_ENDPOINT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sqlQuery,
      }),
    });

    if (!response.ok) {
      console.error(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    onData(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
