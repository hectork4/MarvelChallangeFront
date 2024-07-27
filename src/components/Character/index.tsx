import React from "react";
import { Link } from "wouter";
import Fav from "../Fav";
import "./styles.css";

interface Props {
  title: string;
  url: string;
  id: string;
}

function Character({ title, url, id }: Props) {
  return (
    <div className="character-wrapper">
      <Link to={`/character/${id}`} className="character-link">
        <img loading="lazy" alt={title} src={url} />
      </Link>
      <div className="character-presentation">
        <h4>{title}</h4>
        <div className="favorite-button">
          <Fav id={id} />
        </div>
      </div>
    </div>
  );
}

export default Character;
