import data from "../data";

export function getFavorites({ jwt }: { jwt: string }) {
  return fetch(`${data.USER_ENDPOINT}/favorites`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // "x-access-token": jwt,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
