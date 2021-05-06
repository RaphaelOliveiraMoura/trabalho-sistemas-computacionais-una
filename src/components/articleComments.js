import React from 'react';

export default function ArticleComments() {
    return (
        <div className="article-comments">
            <h2>Comentários</h2>
            <textarea name="comment" id="comment-text" rows="10" cols="100" placeholder="Escreva um comentario"></textarea>
            <input type="submit" name="sendComment" value="Enviar"></input>
        </div>
    )
}
