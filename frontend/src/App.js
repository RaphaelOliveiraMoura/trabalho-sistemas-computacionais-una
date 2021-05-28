import React, { useState, useEffect } from 'react';
import Content from './components/content';
import Container from './components/container';
import Header from './components/header';
import Posts from './components/posts';
import PostCard from './components/postCard';
import Footer from './components/footer';

export default function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    mountPage()
  }, [])

  async function mountPage() {
    const baseUrl = "http://54.234.248.140:3333/posts";
    const headers = { "authorization": "Bearer " + localStorage.getItem("tkn") }
    const pagesRequest = await fetch(baseUrl, { method: "GET", headers: headers });
    const pagesResponse = await pagesRequest.json();
    setPosts(pagesResponse.reverse());
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
          </Posts>
        </Content>
      </Container>
      <Footer />
    </>
  )
}

