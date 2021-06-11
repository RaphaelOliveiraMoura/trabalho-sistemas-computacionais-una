import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import ArticleContainer from './components/articleContainer';
import ArticleBody from './components/articleBody';
import ArticleFooter from './components/articleFooter';
import ArticleHeader from './components/articleHeader';
import Container from './components/container';
import Footer from './components/footer';
import Header from './components/header';
import { getPostDetails, deletePost } from './services/api';

export default function ArticlePage({ match, history }) {
  const { id } = match.params;

  const [article, setArticle] = useState(null);

  useEffect(() => {
    getPostDetails({ postId: id })
      .then((post) => setArticle(post))
      .catch(() => toast.error('Erro ao buscar detalhes do artigo'));
  }, [id]);

  async function onDeletePost() {
    try {
      await deletePost({ postId: id });
      history.push('/');
      toast.success('Artigo deletado com sucesso');
    } catch (error) {
      toast.error('Erro ao deletar artigo');
    }
  }

  return (
    <>
      {window.scrollTo(0, 0)}
      <Header />
      <Container>
        {article && (
          <ArticleContainer key={id}>
            <ArticleHeader
              title={article.title}
              date={article.createdAt}
              author={article.author}
              rating={article.rating}
              onDeletePost={onDeletePost}
            />
            <ArticleBody
              description={article.description}
              body={article.body}
              image={article.image}
            />
            <ArticleFooter post={article} />
          </ArticleContainer>
        )}
      </Container>
      <Footer />
    </>
  );
}
