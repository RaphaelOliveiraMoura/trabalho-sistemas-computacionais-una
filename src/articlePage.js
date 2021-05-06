import React from 'react';
import ArticleContainer from './components/articleContainer';
import ArticleBody from './components/articleBody';
import ArticleComments from './components/articleComments';
import ArticleHeader from './components/articleHeader';
import Container from './components/container';
import Footer from './components/footer';
import Header from './components/header';

export default function ArticlePage() {
    return (
        <>
            <Header />
            <Container>
                <ArticleContainer>
                    <ArticleHeader />
                    <ArticleBody />
                    <ArticleComments />
                </ArticleContainer>
            </Container>
            <Footer />
        </>
    )
}
