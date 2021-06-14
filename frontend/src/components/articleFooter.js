import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Rating from '@material-ui/lab/Rating';

import isLogged from '../utils/isLogged';
import { sendComment, ratePost } from '../services/api';

export default function ArticleFooter({ post: { id, comments = [] } }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([...comments]);
  const [loading, setLoading] = useState(false);

  async function onComment() {
    try {
      if (!comment.trim()) return;
      setLoading(true);
      const createdComment = await sendComment({ postId: id, comment });
      setAllComments([createdComment, ...allComments]);
      setComment('');
      toast.success('Comentário salvo com sucesso');
    } catch (error) {
      toast.error('Não foi possível salvar seu comentário');
    } finally {
      setLoading(false);
    }
  }

  async function onRatePost() {
    try {
      await ratePost({ postId: id, rating });
      toast.success('Avaliação realizada com sucesso');
    } catch (error) {
      toast.error('Não foi possível enviar sua avaliação');
    }
  }

  function mountSendRating() {
    if (isLogged()) {
      return (
        <div className="article-rate">
          <span>Avalie esse artigo</span>
          <Rating
            name="sendRate"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
          <input
            type="submit"
            name="sendRate"
            value="Avaliar"
            onClick={onRatePost}
          ></input>
        </div>
      );
    }

    return (
      <div className="not-logged">
        <div className="article-rate">
          <span>Avalie esse artigo</span>
          <Rating name="sendRate" readOnly />
          <input type="submit" name="sendRate" value="Avaliar" disabled></input>
        </div>
      </div>
    );
  }

  function mountSendComments() {
    if (isLogged()) {
      return (
        <div className="article-comments">
          <h2>Comentários</h2>
          <textarea
            name="comment"
            id="comment-text"
            rows="10"
            cols="100"
            placeholder="Escreva um comentario"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <input
            type="submit"
            name="sendComment"
            value="Comentar"
            disabled={loading}
            onClick={onComment}
          ></input>
        </div>
      );
    }

    return (
      <div className="not-logged">
        <div className="article-comments">
          <h2>Comentários</h2>
          <textarea
            name="comment"
            id="comment-text"
            rows="10"
            cols="100"
            placeholder="Escreva um comentario"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled
          ></textarea>
          <input
            type="submit"
            name="sendComment"
            value="Comentar"
            disabled
          ></input>
        </div>
      </div>
    );
  }

  function mountComments() {
    return allComments
      .sort((a, b) => b.id - a.id)
      .map((atual) => (
        <div key={atual.id} className="comments">
          <h5>{atual.author.name} comentou:</h5>
          <p>{atual.text}</p>
        </div>
      ));
  }

  function notLoggedSection() {
    return (
      !isLogged() && (
        <div className="paywall">
          <p>Faça Login para comentar e avaliar</p>
          <Link to="./../login">
            <span>Login</span>
          </Link>
        </div>
      )
    );
  }

  return (
    <>
      <div className="article-footer">
        {mountSendRating()}
        {notLoggedSection()}
        {mountSendComments()}
      </div>
      {mountComments()}
    </>
  );
}
