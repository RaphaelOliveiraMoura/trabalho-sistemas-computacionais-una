import React from 'react';
import dataFormat from '../utils/dataFormat';
import Rating from '@material-ui/lab/Rating';

export default function ArticleHeader({ title, date, author, rating }) {
    if (!author || !title || !date || !rating) {
        return (
            <>
                <div id="loading"></div>
            </>
        )
    }

    return (
        <>
            <div className="article-header">
                <div className="article-title">
                    <h1>{title}</h1>
                    <p><strong>Autor:</strong> {!author ? "" : author.name}</p> <p><strong>Postado em:</strong> {dataFormat(date)}</p>
                </div>
                <div className="rating">
                    <h3>Avaliação</h3>
                    <Rating name="avaliacao" size="large" readOnly value={!rating ? 0 : rating.total} />
                </div>
            </div>
        </>
    )
}
