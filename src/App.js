import React from 'react';
import Content from './components/content';
import Container from './components/container';
import Header from './components/header';
import Posts from './components/posts';
import PostCard from './components/post-Card';
import Footer from './components/footer';

export default function App() {
  return (
    <>
      <Header />
      <Container>
        <Content>
          <Posts>
            <PostCard></PostCard>
            <PostCard></PostCard>
          </Posts>
        </Content>
      </Container>
      <Footer />
    </>
  )
}

