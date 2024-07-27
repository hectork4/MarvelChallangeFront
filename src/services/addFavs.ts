import data from "../data";

export function addFav({
  favorite,
  token,
}: {
  favorite: string;
  token: string;
}) {
  return fetch(`${data.USER_ENDPOINT}/favorites/add`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // "x-access-token": token,
    },
    body: JSON.stringify({ favorite }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Network Error");
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
