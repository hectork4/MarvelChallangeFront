import data from "../data";
import { Result } from "../interfaces/Character";

export async function getCharacter(characterId?: string, limit: number = 50) {
  try {
    const response = await fetch(
      data.API_URL +
        `${characterId ? "/" + characterId : ""}` +
        data.API_PARAMS +
        `&limit=${limit}`
    );
    const result: Result = await response.json();
    const { data: { results = [] } = {} } = result;

    return results;
  } catch (error) {
    console.error("Error fetching character:", error);
    throw error;
  }
}
