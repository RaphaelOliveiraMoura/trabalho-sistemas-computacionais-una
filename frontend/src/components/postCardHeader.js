import React from 'react';
import Rating from '@material-ui/lab/Rating';
import dataFormat from '../utils/dataFormat';

export default function PostCardHeader({ post }) {
  const { title, createdAt, rating, author } = post;
  return (
    <div className="post-card-header">
      <div>
        <h1>{title}</h1>
        <span>
          <p>
            <strong>Autor:</strong> {author ? author.name : ''}
          </p>
          <p>
            <strong>Postado em:</strong> {dataFormat(createdAt)}
          </p>
        </span>
      </div>
      <div className="rating">
        <h3>Avaliação</h3>
        <Rating size="large" name="post-rating" readOnly value={rating.total} />
      </div>
    </div>
  );
}
