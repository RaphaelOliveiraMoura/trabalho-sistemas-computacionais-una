import Rating from '@material-ui/lab/Rating';
import React from 'react';

export default function ArticleFooter() {
    return (
        <div className="article-footer">
            <div className="article-rate">
                <span>Avalie esse artigo</span>
                <Rating name="sendRate" />
                <input type="submit" name="sendRate" value="Avaliar"></input>
            </div>

            <div className="article-comments">
                <h2>Comentários</h2>
                <textarea name="comment" id="comment-text" rows="10" cols="100" placeholder="Escreva um comentario"></textarea>
                <input type="submit" name="sendComment" value="Comentar"></input>
            </div>
        </div>
    )
}
