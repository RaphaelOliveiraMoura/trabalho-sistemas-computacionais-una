import React from 'react';
import ArticleContainer from './components/articleContainer';
import ArticleBody from './components/articleBody';
import ArticleFooter from './components/articleFooter';
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
                    <ArticleFooter />
                </ArticleContainer>
            </Container>
            <Footer />
        </>
    )
}
