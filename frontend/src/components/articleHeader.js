import React from 'react';
import Rating from '@material-ui/lab/Rating';

export default function ArticleHeader() {
    return (
        <>
            <div className="article-header">
                <div className="article-title">
                    <h1>Título Postagem</h1>
                    <span>Postado em ...</span>
                </div>
                <div className="rating">
                    <h3>Avaliação</h3>
                    <Rating name="avaliacao" size="large" readOnly value={3} />
                </div>
            </div>
        </>
    )
}
