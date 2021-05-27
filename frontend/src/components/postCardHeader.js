import React from 'react';
import Rating from '@material-ui/lab/Rating';

export default function PostCardHeader({ post }) {
    const { title, createdAt, rating, author } = post;
    return (
        <div className="post-card-header">
            <div>
                <h1>{title}</h1>
                <span>
                    <strong>Autor:</strong> {author.name} - <strong>Postado em:</strong> {new Date(createdAt).getDate()}/{new Date(createdAt).getMonth() + 1}/{new Date(createdAt).getFullYear()}
                </span>
            </div>
            <div className="rating">
                <h3>Avaliação</h3>
                <Rating size="large" name="post-rating" readOnly value={rating.total} />
            </div>
        </div>
    )
}