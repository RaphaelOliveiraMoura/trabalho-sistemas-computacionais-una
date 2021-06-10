import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Content from './components/content';
import Container from './components/container';
import Header from './components/header';
import Posts from './components/posts';
import PostCard from './components/postCard';
import Footer from './components/footer';

import { getAllPosts } from './services/api';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [pagesToLoad, setPagesToLoad] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function execute() {
      try {
        const { totalPages, posts } = await getAllPosts({
          totalItems: pagesToLoad,
        });

        setTotalPages(totalPages);
        setPosts(posts);
      } catch (error) {
        toast.error('Erro ao carregar artigos');
      }
    }

    execute();
  }, [pagesToLoad]);

  function loadMorePages() {
    setPagesToLoad(parseInt(pagesToLoad + 5));
  }

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Posts>
            {posts.map((atual) => (
              <PostCard key={atual.id} post={atual} />
            ))}

            {pagesToLoad < totalPages && (
              <div id="reload">
                <button onClick={loadMorePages}>Carregar mais postagens</button>
              </div>
            )}
          </Posts>
        </Content>
      </Container>
      <Footer />
    </>
  );
}
