import React from 'react';
import Container from './container';

export default function CreatePost(props) {
    return (
        <Container>
            <div className="create-article-form">
                <h2>Criar um artigo</h2>
                <input type="text" name="title" id="create-title" placeholder="Título do artigo" onChange={props.onChange}></input>
                <textarea name="description" id="create-description" placeholder="Descrição do artigo" onChange={props.onChange}></textarea>
                <textarea name="articleBody" id="create-article" placeholder="Artigo" onChange={props.onChange}></textarea>
                <label htmlFor="create-article-img">Faça upload de uma imagem para o artigo</label>
                <input type="file" id="create-article-img" name="article-img" accept="image/png, image/jpeg" onChange={props.onChange}></input>
                <input type="submit" value="Criar Artigo" onClick={props.onClick}></input>
            </div>
        </Container>
    )
}
