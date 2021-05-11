import React from 'react';
import ExampleImg from './../img/post-img.jpg';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';

export default function PostCard() {
    return (
        <div className="post-card">
            <div className="post-card-header">
                <div>
                    <h1>Título Postagem</h1>
                    <span>Postado em ...</span>
                </div>
                <div className="rating">
                    <h3>Avaliação</h3>
                    <Rating size="large" readOnly value="3" />
                </div>

            </div>

            <img src={ExampleImg} alt="Capa da postagem" />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mauris sit amet dui nec ipsum sagittis accumsan. Nullam sed erat nulla.
            </p>
            <Link to='./articlePage'>
                <span>Ler mais...</span>
            </Link>

        </div>
    )
}
