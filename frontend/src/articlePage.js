import React, { useState, useEffect } from 'react';
import ArticleContainer from './components/articleContainer';
import ArticleBody from './components/articleBody';
import ArticleFooter from './components/articleFooter';
import ArticleHeader from './components/articleHeader';
import Container from './components/container';
import Footer from './components/footer';
import Header from './components/header';

export default function ArticlePage({ match: { params: { id } } }) {
    const [article, setArticle] = useState({});
    useEffect(() => {
        mountArticle()
    }, [])

    async function mountArticle() {
        const baseUrl = "http://54.234.248.140:3333/posts/";
        const headers = { "authorization": "Bearer " + localStorage.getItem("tkn") };
        const articleRequest = await fetch(baseUrl + id, {
            method: 'GET',
            headers: headers
        });
        const articleResponse = await articleRequest.json();
        setArticle(articleResponse);
    }

    return (

        <>
            {window.scrollTo(0, 0)}
            <Header />
            <Container>
                {
                    !article ? mountArticle() : <><ArticleContainer key={id}><ArticleHeader title={article.title} date={article.createdAt} author={article.author} rating={article.rating} /><ArticleBody description={article.description} body={article.body} image={article.image} /><ArticleFooter post={article} /></ArticleContainer></>
                }
            </Container>
            <Footer />
        </>
    )
}
