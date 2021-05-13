import React from 'react';
import Container from './container';

export default function CreatePost() {
    return (
        <Container>
            <div className="create-article-form">
                <h2>Crie um artigo</h2>
                <input type="text" name="title" id="title" placeholder="Título do artigo"></input>
                <textarea name="description" id="description" placeholder="Descrição do artigo"></textarea>
                <input type="file" id="article-img" name="article-img" accept="image/png, image/jpeg"></input>
                <textarea name="article" id="article" placeholder="Artigo"></textarea>
                <input type="submit" value="Criar Artigo"></input>
            </div>
        </Container>
    )

}
