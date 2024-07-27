import { useContext } from "react";
import UserContext from "../../context/UserContext";
import useUser from "../../hooks/useUser";
import "./styles.css";

export default function Fav({ id }: { id: string }) {
  const { addFavorite, removeFavorite } = useUser();
  const { favorites } = useContext(UserContext);

  const handleClick = () => {
    const parsedId = `${id}`;
    favorites.includes(parsedId)
      ? removeFavorite({ id: parsedId })
      : addFavorite({ id: parsedId });
  };

  const [label, emoji] = favorites.includes(`${id}`)
    ? ["Remove Character from favorites", "❤️"]
    : ["Add Character to favorites", "🤍"];

  return (
    <>
      <button
        className="character-fav"
        onClick={handleClick}
        aria-label={`${label} button`}
      >
        <span role="img" aria-label={label}>
          {emoji}
        </span>
      </button>
    </>
  );
}
