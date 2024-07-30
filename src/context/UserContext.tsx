import React, { useEffect, useState } from "react";
import { getFavorites } from "../services";
import { getFavoritesFromLocalStorage } from "../helpers/getFavsFromLocal";

interface UserContextProps {
  children: React.ReactNode;
}

interface UserContextType {
  favorites: string[];
  handleFavorites: (id: string[]) => void;
  handleUser: (user?: string, jwt?: string) => void;
  toggleFavoriteScreen: (value?: boolean) => void;
  handleLimit: (value: number) => void;
  limit: number;
  user: User;
  favoriteScreen?: boolean;
}

interface User {
  username: string;
  token: string | null;
}

export const initialContext: UserContextType = {
  favorites: [],
  handleFavorites: () => {},
  handleUser: () => {},
  toggleFavoriteScreen: () => {},
  user: { username: "", token: null },
  handleLimit: () => {},
  limit: 25,
};

const UserContext = React.createContext<UserContextType>(initialContext);

export default UserContext;

export function UserContextProvider({ children }: UserContextProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteScreen, setFavoriteScreen] = useState(false);
  const [limit, setLimit] = useState(25);

  const [user, setUser] = useState(() => ({
    token: window.sessionStorage.getItem("jwt"),
    username: "",
  }));

  useEffect(() => {
    handleFavorites(getFavoritesFromLocalStorage());
    user.token &&
      getFavorites({ jwt: user.token })
        .then((res) => {
          setFavorites(res.favorites ?? []);
          setUser({ ...user, username: res.username });
        })
        .catch((error: Error) => {
          handleUser();
          window.sessionStorage.setItem("jwt", "");
          console.error(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavorites = (favorites: string[]) => {
    !user.token &&
      window.localStorage.setItem("favorites", JSON.stringify(favorites));
    setFavorites(favorites);
  };

  const toggleFavoriteScreen = (value?: boolean) => {
    setFavoriteScreen((prev) => value ?? !prev);
  };

  const handleUser = (user = "", jwt = "") => {
    setUser({
      token: jwt,
      username: user,
    });
  };

  const handleLimit = (value: number) => {
    setLimit(value);
  };

  return (
    <UserContext.Provider
      value={{
        favorites,
        handleFavorites,
        handleUser,
        user,
        toggleFavoriteScreen,
        favoriteScreen,
        handleLimit,
        limit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
