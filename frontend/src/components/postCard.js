import React from 'react';
import PostCardHeader from './postCardHeader';
import PostBody from './postCardBody';

export default function PostCard({ post }) {
    return (
        <article className="post-card">
            <PostCardHeader post={post} />
            <PostBody post={post} />
        </article>
    )
}
