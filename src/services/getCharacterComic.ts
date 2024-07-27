import data from "../data";
import { Result } from "../interfaces/Comics";

export async function getComicsByCharacter(characterId?: string) {
  try {
    const response = await fetch(
      data.API_URL + `/${characterId}/comics` + data.API_PARAMS + "&limit=10"
    );
    const result: Result = await response.json();
    const { data: { results = [] } = {} } = result;

    return results;
  } catch (error) {
    console.error("Error fetching character:", error);
    throw error;
  }
}
