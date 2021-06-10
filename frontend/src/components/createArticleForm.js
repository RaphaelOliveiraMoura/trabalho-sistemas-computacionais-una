import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Container from './container';
import { createPost } from '../services/api';

const errorsMap = {
  'title is required': 'O campo Título precisa ser preenchido',
  'description is required': 'O campo Descrição precisa ser preenchido',
  'body is required': 'O campo Artigo precisa ser preenchido',
  'image is required': 'O campo Imagem precisa ser preenchido',
};

export default function CreatePost({ history }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [articleBody, setArticleBody] = useState('');
  const [image, setImage] = useState('');

  async function sendArticle() {
    try {
      await createPost({
        title,
        description,
        image,
        body: articleBody,
      });

      history.push('/');
      toast.success('Artigo publicado com sucesso');
    } catch (error) {
      const errorMessage = errorsMap[error.message] || 'Erro ao criar artigo';
      toast.error(errorMessage);
    }
  }

  return (
    <Container>
      <div className="create-article-form">
        <h2>Criar um artigo</h2>

        <input
          type="text"
          name="title"
          id="create-title"
          placeholder="Título do artigo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <textarea
          name="description"
          id="create-description"
          placeholder="Descrição do artigo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <textarea
          name="body"
          id="create-article"
          placeholder="Artigo"
          value={articleBody}
          onChange={(e) => setArticleBody(e.target.value)}
        ></textarea>

        <input
          type="text"
          id="create-article-img"
          name="image"
          placeholder="Url da imagem"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        ></input>

        <input type="submit" value="Criar Artigo" onClick={sendArticle}></input>
      </div>
    </Container>
  );
}
