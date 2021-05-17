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
    //const pagesRequest = await fetch();
    //const pagesResponse = await pagesRequest.json();

    const pagesResponse = [
      {
        id: 1,
        title: "Meu primeiro post",
        postDate: "2020-10-07T21:38:06.932Z",
        rating: 4.3,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dolor erat, ultricies at eleifend sed, scelerisque at risus."
      },
      {
        id: 2,
        title: "Meu segundo post",
        postDate: "2021-05-05T21:38:06.932Z",
        rating: 3,
        description: "Nunc eu tempus nisl, ornare pulvinar dui. Ut tempus ullamcorper purus in interdum."
      }
    ];
    setPosts(pagesResponse);
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

