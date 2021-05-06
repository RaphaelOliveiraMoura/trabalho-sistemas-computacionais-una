import React from 'react';
import Rating from './rating';

export default function ArticleHeader() {
    return (
        <>
            <div className="article-header">
                <div>
                    <h1>Título Postagem</h1>
                    <span>Postado em ...</span>
                </div>
                <Rating />
            </div>
        </>
    )
}
