import Rating from '@material-ui/lab/Rating';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import isLogged from '../utils/isLogged';

export default function ArticleFooter({ post: { id, comments } }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        mountComments();
    }, [allComments])

    useEffect(() => {
        setAllComments(comments);
    }, [comments])

    function mountSendRating() {
        if (isLogged()) {
            return (
                <div className="article-rate">
                    <span>Avalie esse artigo</span>
                    <Rating
                        name="sendRate"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))} />
                    <input
                        type="submit"
                        name="sendRate"
                        value="Avaliar"
                        onClick={sendRating}></input>
                </div>
            );
        } else {
            return (
                <div className="not-logged">
                    <div className="article-rate">
                        <span>Avalie esse artigo</span>
                        <Rating
                            name="sendRate"
                            readOnly
                        />
                        <input
                            type="submit"
                            name="sendRate"
                            value="Avaliar"
                            disabled></input>
                    </div>
                </div>

            );
        }
    }

    function mountSendRating() {
        if (isLogged()) {
            return (
                <div className="article-rate">
                    <span>Avalie esse artigo</span>
                    <Rating
                        name="sendRate"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))} />
                    <input
                        type="submit"
                        name="sendRate"
                        value="Avaliar"
                        onClick={sendRating}></input>
                </div>
            );
        } else {
            return (
                <div className="not-logged">
                    <div className="article-rate">
                        <span>Avalie esse artigo</span>
                        <Rating
                            name="sendRate"
                            readOnly
                        />
                        <input
                            type="submit"
                            name="sendRate"
                            value="Avaliar"
                            disabled></input>
                    </div>
                </div>

            );
        }
    }

    async function sendRating() {
        const baseUrl = "http://54.234.248.140:3333/posts/" + id + "/rate";
        const headers = {
            "Content-type": "Application/json", "authorization": "Bearer " + localStorage.getItem("tkn")
        };
        const reviewSubmit = await fetch(baseUrl, {
            method: 'POST',
            headers: headers,
            mode: 'cors',
            body: JSON.stringify({ rating })
        });
        if (reviewSubmit.status === 200) {
            alert(`Avaliação enviada com sucesso!\nObrigado por avaliar!`);
            setRating(0);
        }
    }

    function mountSendComments() {
        if (isLogged()) {
            return (
                <div className="article-comments">
                    <h2>Comentários</h2>
                    <textarea
                        name="comment"
                        id="comment-text"
                        rows="10"
                        cols="100"
                        placeholder="Escreva um comentario"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}>
                    </textarea>
                    <input
                        type="submit"
                        name="sendComment"
                        value="Comentar"
                        onClick={sendComment}>
                    </input>
                </div>
            );
        } else {
            return (
                <div className="not-logged">
                    <div className="article-comments">
                        <h2>Comentários</h2>
                        <textarea
                            name="comment"
                            id="comment-text"
                            rows="10"
                            cols="100"
                            placeholder="Escreva um comentario"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            disabled
                        >
                        </textarea>
                        <input
                            type="submit"
                            name="sendComment"
                            value="Comentar"
                            disabled
                        >
                        </input>
                    </div>
                </div>
            );
        };
    }

    function mountSendComments() {
        if (isLogged()) {
            return (
                <div className="article-comments">
                    <h2>Comentários</h2>
                    <textarea
                        name="comment"
                        id="comment-text"
                        rows="10"
                        cols="100"
                        placeholder="Escreva um comentario"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}>
                    </textarea>
                    <input
                        type="submit"
                        name="sendComment"
                        value="Comentar"
                        onClick={sendComment}>
                    </input>
                </div>
            );
        } else {
            return (
                <div className="not-logged">
                    <div className="article-comments">
                        <h2>Comentários</h2>
                        <textarea
                            name="comment"
                            id="comment-text"
                            rows="10"
                            cols="100"
                            placeholder="Escreva um comentario"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            disabled
                        >
                        </textarea>
                        <input
                            type="submit"
                            name="sendComment"
                            value="Comentar"
                            disabled
                        >
                        </input>
                    </div>
                </div>
            );
        };
    }

    async function sendComment() {
        const baseUrl = "http://54.234.248.140:3333/posts/" + id + "/comment";
        const headers = {
            "Content-type": "Application/json", "authorization": "Bearer " + localStorage.getItem("tkn")
        };
        const commentSubmit = await fetch(baseUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ text: comment })
        });
        getComments();
        setComment("");
    }


    async function getComments() {
        const baseUrl = "http://54.234.248.140:3333/posts/";
        const headers = { "authorization": "Bearer " + localStorage.getItem("tkn") };
        const articleRequest = await fetch(baseUrl + id, {
            method: 'GET',
            headers: headers
        });
        const articleResponse = await articleRequest.json();
        setAllComments(articleResponse.comments);
        setComment("");
    }

    function mountComments() {
        if (!!allComments) {
            return (
                allComments.sort((a, b) => { return b.id - a.id; }).map((atual) => <div key={atual.id} className="comments"><h5>{atual.author.name} comentou:</h5><p>{atual.text}</p></div>)
            );
        };
    }

    return (
        <>
            <div className="article-footer">
                {mountSendRating()}
                {!isLogged() ? <div className="paywall">
                    <p>Faça Login para comentar e avaliar</p>
                    <Link to={'./../login'} >
                        <span>Login</span>
                    </Link></div> : ""}
                {mountSendComments()}

            </div>
            {mountComments()}
        </>
    )
}
