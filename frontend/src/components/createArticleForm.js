import React from 'react';
import Container from './container';

export default function CreatePost() {
    return (
        <Container>
            <div className="create-article-form">
                <h2>Criar um artigo</h2>
                <input type="text" name="title" id="create-title" placeholder="Título do artigo"></input>
                <textarea name="description" id="create-description" placeholder="Descrição do artigo"></textarea>
                <textarea name="article" id="create-article" placeholder="Artigo"></textarea>
                <label htmlFor="create-article-img">Faça upload de uma imagem para o artigo</label>
                <input type="file" id="create-article-img" name="article-img" accept="image/png, image/jpeg"></input>
                <input type="submit" value="Criar Artigo"></input>
            </div>
        </Container>
    )
}
