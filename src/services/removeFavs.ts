import data from "../data";

export function removeFav({
  favourite,
  token,
}: {
  favourite: string;
  token: string;
}) {
  return fetch(`${data.USER_ENDPOINT}/favorites/remove`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // "x-access-token": token,
    },
    body: JSON.stringify({ favourite }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Response is NOT ok");
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
