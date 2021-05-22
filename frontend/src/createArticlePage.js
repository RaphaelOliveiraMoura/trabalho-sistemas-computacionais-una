import React from 'react';
import CreatePost from './components/createArticleForm';
import Footer from './components/footer';
import Header from './components/header';

export default function CreateArticle() {
    const article = {}
    function sendArticle() {
        const { title, description, articleBody } = article;
        if (!title || !description || !articleBody) {
            return alert("Todos os campos devem ser preenchidos");
        };
    };

    function setArticle(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        article[name] = value;
    };

    return (
        <>
            <Header />
            <CreatePost onClick={sendArticle} onChange={setArticle}></CreatePost>
            <Footer />
        </>
    )
}