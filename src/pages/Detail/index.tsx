import Spinner from "../../components/Spinner";
import { useRoute } from "wouter";
import useSingleCharacter from "../../hooks/useSingleCharacter";
import Fav from "../../components/Fav";
import "./styles.css";

export default function Detail() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, id] = useRoute("/character/:id");

  const { character, formatedComics, isCharacterLoading, isComicsLoading } =
    useSingleCharacter({ id: id?.id! });
  return (
    <>
      <div className="single-character-wrapper">
        {isCharacterLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="character-image">
              <img
                src={
                  character?.thumbnail.path +
                  "." +
                  character?.thumbnail.extension
                }
                alt={character?.name}
              />
            </div>
            <div className="character-desc">
              <div className="character-title">
                <h3>{character?.name}</h3>
                <Fav id={`${character?.id}`} />
              </div>
              <p>{character?.description}</p>
            </div>
          </>
        )}
      </div>

      <div className="comics-wrapper">
        {isComicsLoading ? (
          <Spinner />
        ) : (
          <>
            <h2>Comics</h2>
            <div className="comics-list">
              {formatedComics?.map((comic) => (
                <div className="comic" key={comic.title}>
                  <img src={comic.thumbnail} alt={comic.title} />
                  <p>{comic.title}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
