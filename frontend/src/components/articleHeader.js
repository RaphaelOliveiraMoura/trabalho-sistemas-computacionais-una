import React from 'react';
import dataFormat from '../utils/dataFormat';
import Rating from '@material-ui/lab/Rating';
import { AiOutlineDelete } from 'react-icons/ai';

export default function ArticleHeader({
  onDeletePost,
  title,
  date,
  author,
  rating,
}) {
  if (!author || !title || !date || !rating) return <div id="loading"></div>;

  const showDeleteButton =
    localStorage.getItem('email') &&
    localStorage.getItem('email') === author.email;

  return (
    <>
      <div className="article-header">
        <div className="article-title">
          <h1>{title}</h1>
        </div>
        <div className="article-data">
          <div>
            <p>
              <strong>Autor:</strong> {!author ? '' : author.name}
            </p>
            <p>
              <strong>Postado em:</strong> {dataFormat(date)}
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
            {showDeleteButton && (
              <button className="delete-button" onClick={onDeletePost}>
                <AiOutlineDelete size={20} color="#ff5252" />
                Deletar post
              </button>
            )}
          </div>


        </div>
      </div>
    </>
  );
}
