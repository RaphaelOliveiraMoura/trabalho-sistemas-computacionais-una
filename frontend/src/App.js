import React, { useState, useEffect } from 'react';
import Content from './components/content';
import Container from './components/container';
import Header from './components/header';
import Posts from './components/posts';
import PostCard from './components/postCard';
import Footer from './components/footer';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [pagesToLoad, setPagesToLoad] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    mountPage()
  }, [pagesToLoad])

  async function mountPage() {
    const baseUrl = "http://54.234.248.140:3333/posts";
    const headers = { "authorization": "Bearer " + localStorage.getItem("tkn") };
    const pagesRequest = await fetch(baseUrl, { method: "GET", headers: headers });
    const pagesResponse = await pagesRequest.json();
    setTotalPages(pagesResponse.length);
    setPosts(pagesResponse.reverse().slice(0, pagesToLoad));
  }

  function loadPages() {
    setPagesToLoad(parseInt(pagesToLoad + 5));
  }

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Posts>
            {
              !posts ? mountPage() : posts.map(atual => <PostCard key={atual.id} post={atual} />)
            }
            {
              pagesToLoad < totalPages ? <div id="reload">
                <button onClick={loadPages}>Carregar mais postagens</button>
              </div> : ""
            }

          </Posts>
        </Content>
      </Container>
      <Footer />
    </>
  )
}

