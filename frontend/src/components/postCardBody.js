import React from 'react';

import { Link } from 'react-router-dom';

import ImagePattern from '../img/logo.png';

export default function PostBody({ post: { image, description, id } }) {
  return (
    <>
      <img
        src={image}
        alt="Capa da postagem"
        onError={(event) => {
          event.target.src = ImagePattern;
        }}
      />
      <p>{description}</p>

      <Link to={`./articlePage/${id}`}>
        <span>Ler mais...</span>
      </Link>
    </>
  );
}
