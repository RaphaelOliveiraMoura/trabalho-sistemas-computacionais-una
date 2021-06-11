import React from 'react';

export default function ArticleBody({ description, body, image }) {
  if (!description || !body || !image) return <></>;

  const bodyContent = !!body
    ? body.split(/\n/g).map((atual, i) => <p key={i}>{atual}</p>)
    : '';

  return (
    <>
      <div className="article-body">
        <h4 id="description">{description}</h4>
        <img src={image} alt="Capa da postagem" />
        {bodyContent}
      </div>
    </>
  );
}
