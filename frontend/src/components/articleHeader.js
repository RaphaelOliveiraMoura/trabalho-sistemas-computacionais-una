import React from 'react';
import Rating from '@material-ui/lab/Rating';

export default function ArticleHeader({ post }) {
    const { title, autor, postDate, rating } = post;
    return (
        <>
            <div className="article-header">
                <div className="article-title">
                    <h1>{title}</h1>
                    <span>{autor} - {new Date(postDate).getDate()}/{new Date(postDate).getMonth() + 1}/{new Date(postDate).getFullYear()}</span>
                </div>
                <div className="rating">
                    <h3>Avaliação</h3>
                    <Rating name="avaliacao" size="large" readOnly value={rating} />
                </div>
            </div>
        </>
    )
}
