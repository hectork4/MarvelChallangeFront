import React, { useEffect, useState } from "react";
import { getFavorites } from "../services";

interface UserContextProps {
  children: React.ReactNode;
}

interface UserContextType {
  favorites: string[];
  handleFavorites: (id: string[]) => void;
  handleUser: (user?: string, jwt?: string) => void;
  toggleFavoriteScreen: (value?: boolean) => void;
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
};

const UserContext = React.createContext<UserContextType>(initialContext);

export default UserContext;

export function UserContextProvider({ children }: UserContextProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteScreen, setFavoriteScreen] = useState(false);

  const [user, setUser] = useState(() => ({
    token: window.sessionStorage.getItem("jwt"),
    username: "",
  }));

  useEffect(() => {
    if (!user.token) setFavorites([]);
    user.token &&
      getFavorites({ jwt: user.token })
        .then((res) => {
          setFavorites(res.favorites ?? []);
          setUser({ ...user, username: res.username });
        })
        .catch((error: Error) => {
          if (error.message.includes("Unauthorized")) {
            console.error("Unauthorized access");
            handleUser();
            handleFavorites([]);
            window.sessionStorage.setItem("jwt", "");
          }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavorites = (favorites: string[]) => {
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

  return (
    <UserContext.Provider
      value={{
        favorites,
        handleFavorites,
        handleUser,
        user,
        toggleFavoriteScreen,
        favoriteScreen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
