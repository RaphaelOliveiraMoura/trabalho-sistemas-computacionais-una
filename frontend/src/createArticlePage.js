import React from 'react';
import CreatePost from './components/createArticleForm';
import Footer from './components/footer';
import Header from './components/header';

export default function CreateArticle() {
    const article = {}
    function sendArticle() {
        const { title, description, articleBody } = article;
        const date = new Date();
        if (!title || !description || !articleBody) {
            return alert("Todos os campos devem ser preenchidos");
        };
        const postDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    function setArticle(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        article.[name] = value;
    };

    return (
        <>
            <Header />
            <CreatePost onClick={sendArticle} onChange={setArticle}></CreatePost>
            <Footer />
        </>
    )
}
