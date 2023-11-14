import { BASE_STATUS_URL } from "./apiConstants";

export async function getStatusesFromAPI() {
    try {
      const response = await fetch(`${BASE_STATUS_URL}/list`);

      if (!response.ok) {
        throw new Error('Failed to fetch list of statuses from the API');
      }
      const data = await response.json();
      return data;
    } catch (error) {
        console.error('Error fetching list of statuses.', error);
    }
}
