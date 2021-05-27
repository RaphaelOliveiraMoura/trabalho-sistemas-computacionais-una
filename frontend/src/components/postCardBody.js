import React from 'react';
import { Link } from 'react-router-dom';

export default function PostBody({ post }) {

    return (
        <>
            <img src={post.image} alt="Capa da postagem" />
            <p>
                {post.description}
            </p>
            <Link to={`./articlePage/${post.id}`}>
                <span>Ler mais...</span>
            </Link>
        </>
    )
}
