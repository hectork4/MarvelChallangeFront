import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { RegisterUser, User } from "../interfaces/User";
import {
  addFav,
  loginService,
  removeFav,
  register as registerService,
} from "../services";

export default function useUser() {
  const { favorites, handleFavorites, user, handleUser } =
    useContext(UserContext) || {};

  const [state, setState] = useState({ loading: false, error: false });

  const login = ({ username, password }: User) => {
    setState({ loading: true, error: false });
    loginService({ username, password })
      .then(({ jwt, username, favorites }) => {
        if (jwt) {
          handleUser(username, jwt);
          handleFavorites(favorites);
          window.sessionStorage.setItem("jwt", jwt);
        }
      })
      .catch((error) => {
        console.error(error);
        setState({ loading: false, error: true });
        window.sessionStorage.setItem("jwt", "");
      });
    setState({ ...state, loading: false });
  };

  const register = async ({
    username,
    password,
    confirmPassword,
  }: RegisterUser) => {
    setState({ loading: true, error: false });
    if (password !== confirmPassword) {
      setState({ loading: false, error: true });
      return;
    }
    registerService({ username, password: `${password}` })
      .then(({ jwt, username }) => {
        if (jwt) {
          handleUser(username, jwt);
          handleFavorites([]);
          window.sessionStorage.setItem("jwt", jwt);
        }
      })
      .catch((error) => {
        console.error(error);
        setState({ loading: false, error: true });
        window.sessionStorage.setItem("jwt", "");
      });
    setState({ error: false, loading: false });
  };

  const logout = () => {
    handleUser();
    handleFavorites([]);
    window.sessionStorage.setItem("jwt", "");
  };

  const addFavorite = ({ id }: { id: string }) => {
    const newFavorites = [...favorites, id];
    handleFavorites(newFavorites);
    user.token && addFav({ favorite: id, token: user.token });
  };

  const removeFavorite = ({ id }: { id: string }) => {
    const newFavorites = favorites.filter((favId) => favId !== id);
    handleFavorites(newFavorites);
    user.token && removeFav({ favourite: id, token: user.token });
  };

  return {
    isLogged: !!user.token,
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    register,
    logout,
    addFavorite,
    removeFavorite,
    favorites,
  };
}
