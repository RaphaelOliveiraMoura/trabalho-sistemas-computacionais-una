import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Container from './container';

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [articleBody, setArticleBody] = useState("");
    const [image, setImage] = useState("");

    async function sendArticle() {
        if (!localStorage.getItem("tkn")) {
            alert("Você precisa estar logado para fazer uma postagem");
        }

        if (!title || !description || !articleBody) {
            return alert("Todos os campos devem ser preenchidos");
        };

        if (!!image) {
            if (!validateURL(image)) {
                return alert("O url da imagem não é válido");
            }
        };

        const article = {
            title: title,
            description: description,
            image: image,
            body: articleBody
        };
        const headers = {
            "Content-type": "Application/json", "authorization": !localStorage.getItem("tkn") ? "" : "Bearer " + localStorage.getItem("tkn")
        };
        const baseUrl = "http://54.234.248.140:3333/posts";
        const req = await fetch(baseUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(article)
        });

        if (req.status === 401) {
            return alert("Você não está autorizado a fazer uma postagem, para postar faça login ou crie uma conta");
        }

        if (req.status === 400) {
            alert("Todos os campos precisam ser preenchidos");
        }

        if (req.status === 201) {
            return alert("Postagem efetuada com sucesso");
        }

    };

    function validateURL(image) {
        var url = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$', 'i');
        return !!url.test(image);
    }

    return (
        <Container>
            <div className="create-article-form">
                <h2>Criar um artigo</h2>

                <input type="text" name="title" id="create-title" placeholder="Título do artigo" value={title} onChange={(e) => setTitle(e.target.value)}></input>

                <textarea name="description" id="create-description" placeholder="Descrição do artigo" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                <textarea name="body" id="create-article" placeholder="Artigo" value={articleBody} onChange={(e) => setArticleBody(e.target.value)}></textarea>

                <input type="text" id="create-article-img" name="image" placeholder="Url da imagem" value={image} onChange={(e) => setImage(e.target.value)}></input>

                <input type="submit" value="Criar Artigo" onClick={sendArticle}></input>
            </div>
            { !localStorage.getItem("tkn") ? <Redirect to="/" /> : ""}
        </Container>

    )
}
