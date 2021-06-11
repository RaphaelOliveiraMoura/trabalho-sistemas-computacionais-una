import React from 'react';

import { Link } from 'react-router-dom';

export default function PostBody({ post: { image, description, id } }) {
  return (
    <>
      <img src={image} alt="Capa da postagem" />
      <p>{description}</p>

      <Link to={`./articlePage/${id}`}>
        <span>Ler mais...</span>
      </Link>
    </>
  );
}
