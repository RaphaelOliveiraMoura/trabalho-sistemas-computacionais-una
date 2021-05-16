import React, { useState } from 'react';
import ArticleContainer from './components/articleContainer';
import ArticleBody from './components/articleBody';
import ArticleFooter from './components/articleFooter';
import ArticleHeader from './components/articleHeader';
import Container from './components/container';
import Footer from './components/footer';
import Header from './components/header';

export default function ArticlePage() {
    const [article, setArticle] = useState("");
    function mountArticle() {
        //const articleRequest = await fetch();
        //const articleResponse = await articleRequest.json();

        const articleResponse = [
            {
                id: 1,
                title: "Meu primeiro post",
                autor: "JonatanFavro",
                postDate: "2020-10-07T21:38:06.932Z",
                rating: 4.3,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dolor erat, ultricies at eleifend sed, scelerisque at risus.",
                articleBody: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id odio tempus, dictum mi vel, condimentum ante. Aenean venenatis ligula a nulla auctor, sed semper quam egestas. Suspendisse non aliquet quam. Phasellus et est consectetur, pretium justo sed, feugiat lectus. Duis gravida risus justo, at posuere urna mollis id. Phasellus consectetur, tortor vitae pretium pulvinar, erat sem aliquet arcu, vel efficitur elit sem sed neque. Phasellus aliquet vulputate nunc ut rutrum. Quisque massa dolor, mattis vitae urna et, suscipit posuere libero. Aenean convallis risus varius vulputate commodo.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id odio tempus, dictum mi vel, condimentum ante. Aenean venenatis ligula a nulla auctor, sed semper quam egestas. Suspendisse non aliquet quam. Phasellus et est consectetur, pretium justo sed, feugiat lectus. Duis gravida risus justo, at posuere urna mollis id. Phasellus consectetur, tortor vitae pretium pulvinar, erat sem aliquet arcu, vel efficitur elit sem sed neque. Phasellus aliquet vulputate nunc ut rutrum. Quisque massa dolor, mattis vitae urna et, suscipit posuere libero. Aenean convallis risus varius vulputate commodo.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id odio tempus, dictum mi vel, condimentum ante. Aenean venenatis ligula a nulla auctor, sed semper quam egestas. Suspendisse non aliquet quam. Phasellus et est consectetur, pretium justo sed, feugiat lectus. Duis gravida risus justo, at posuere urna mollis id. Phasellus consectetur, tortor vitae pretium pulvinar, erat sem aliquet arcu, vel efficitur elit sem sed neque. Phasellus aliquet vulputate nunc ut rutrum. Quisque massa dolor, mattis vitae urna et, suscipit posuere libero. Aenean convallis risus varius vulputate commodo.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id odio tempus, dictum mi vel, condimentum ante. Aenean venenatis ligula a nulla auctor, sed semper quam egestas. Suspendisse non aliquet quam. Phasellus et est consectetur, pretium justo sed, feugiat lectus. Duis gravida risus justo, at posuere urna mollis id. Phasellus consectetur, tortor vitae pretium pulvinar, erat sem aliquet arcu, vel efficitur elit sem sed neque. Phasellus aliquet vulputate nunc ut rutrum. Quisque massa dolor, mattis vitae urna et, suscipit posuere libero. Aenean convallis risus varius vulputate commodo.`
            }
        ];

        setArticle(articleResponse);
    }

    return (
        <>
            <Header />
            <Container>
                {
                    !article ? mountArticle() : article.map(atual => <ArticleContainer key={atual.id}><ArticleHeader post={atual} /><ArticleBody post={atual} /><ArticleFooter post={atual} /></ArticleContainer>)
                }
            </Container>
            <Footer />
        </>
    )
}
