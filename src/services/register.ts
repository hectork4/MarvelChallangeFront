import data from "../data";
import { User } from "../interfaces/User";

export function register({ username, password }: User) {
  return fetch(`${data.USER_ENDPOINT}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Response is NOT ok");
      return res.json();
    })
    .then((res: { token: string; username: string }) => {
      const { token: jwt, username } = res;
      return { jwt, username };
    })
    .catch((error) => {
      throw new Error(error);
    });
}
