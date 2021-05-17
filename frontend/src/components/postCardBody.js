import React from 'react';
import ExampleImg from './../img/post-img.jpg';
import { Link } from 'react-router-dom';

export default function PostBody({ description }) {
    return (
        <>
            <img src={ExampleImg} alt="Capa da postagem" />
            <p>
                {description}
            </p>
            <Link to='./articlePage'>
                <span>Ler mais...</span>
            </Link>
        </>
    )
}
