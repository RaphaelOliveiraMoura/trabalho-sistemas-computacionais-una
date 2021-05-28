import Rating from '@material-ui/lab/Rating';
import React, { useState } from 'react';

export default function ArticleFooter({ post: { id, comments } }) {
    const [rating, setRating] = useState(0)

    async function sendRating() {
        const baseUrl = "http://54.234.248.140:3333/posts/" + id + "/rate";
        const headers = {
            "Content-type": "Application/json", "authorization": !localStorage.getItem("tkn") ? "" : "Bearer " + localStorage.getItem("tkn")
        };
        const reviewSubmit = await fetch(baseUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(rating)
        });

        console.log(reviewSubmit)
    }

    return (
        <div className="article-footer">
            <div className="article-rate">
                <span>Avalie esse artigo</span>
                <Rating name="sendRate" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} />
                <input type="submit" name="sendRate" value="Avaliar" onClick={sendRating}></input>
            </div>

            <div className="article-comments">
                <h2>Comentários</h2>
                <textarea name="comment" id="comment-text" rows="10" cols="100" placeholder="Escreva um comentario"></textarea>
                <input type="submit" name="sendComment" value="Comentar"></input>
            </div>
        </div>
    )
}
