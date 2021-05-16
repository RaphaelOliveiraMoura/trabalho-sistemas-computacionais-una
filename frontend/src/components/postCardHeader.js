import React from 'react';
import Rating from '@material-ui/lab/Rating';

export default function PostCardHeader({ post }) {
    const { title, postDate, rating } = post
    return (
        <div className="post-card-header">
            <div>
                <h1>{title}</h1>
                <span>
                    Postado em {new Date(postDate).getDate()}/{new Date(postDate).getMonth() + 1}/{new Date(postDate).getFullYear()}
                </span>
            </div>
            <div className="rating">
                <h3>Avaliação</h3>
                <Rating size="large" name="post-rating" readOnly value={rating} />
            </div>
        </div>
    )
}