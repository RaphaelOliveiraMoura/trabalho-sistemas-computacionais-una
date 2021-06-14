import React from 'react';
import Rating from '@material-ui/lab/Rating';
import dataFormat from '../utils/dataFormat';

export default function PostCardHeader({ post }) {
  const { title, createdAt, rating, author } = post;
  return (
    <div className="post-card-header">
      <div>
        <h1>{title}</h1>
      </div>
      <div className="article-data">
        <div>
          <p>
            <strong>Autor:</strong> {!author ? '' : author.name}
          </p>
          <p>
            <strong>Postado em:</strong> {dataFormat(createdAt)}
          </p>
        </div>
        <div className="rating">
          <h3>Avaliação</h3>
          <Rating
            name="avaliacao"
            size="large"
            readOnly
            value={!rating ? 0 : rating.total}
          />
        </div>
      </div>
    </div>
  );
}
