import data from "../data";
import { User } from "../interfaces/User";

export function loginService({ username, password }: User) {
  return fetch(`${data.USER_ENDPOINT}/user/login`, {
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
    .then(
      (res: {
        token: string;
        user: { favorites: string[]; username: string };
      }) => {
        const {
          token: jwt,
          user: { username, favorites },
        } = res;
        return { jwt, username, favorites };
      }
    )
    .catch((error) => {
      throw new Error(error);
    });
}
