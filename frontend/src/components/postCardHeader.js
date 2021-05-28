import React from 'react';
import Rating from '@material-ui/lab/Rating';
import dataFormat from '../utils/dataFormat';

export default function PostCardHeader({ post }) {
    const { title, createdAt, rating, author } = post;
    return (
        <div className="post-card-header">
            <div>
                <h1>{title}</h1>
                <span>
                    <strong>Autor:</strong> {author.name} - <strong>Postado em:</strong> {dataFormat(createdAt)}
                </span>
            </div>
            <div className="rating">
                <h3>Avaliação</h3>
                <Rating size="large" name="post-rating" readOnly value={rating.total} />
            </div>
        </div>
    )
}