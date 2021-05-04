import React from 'react'
import Content from './content'
import Container from './container'
import Header from './header'
import Posts from './posts'
import PostCard from './post-card'
import Footer from './footer'

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

