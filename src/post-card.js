import React from 'react'
import ExampleImg from './img/post-img.jpg'

export default function PostCard() {
    return (
        <div className="post-card">
            <div className="post-card-header">
                <h1>Título Postagem</h1>
                <div>Classificação</div>
            </div>
            <span>Postado em ...</span>
            <img src={ExampleImg} />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mauris sit amet dui nec ipsum sagittis accumsan. Nullam sed erat nulla.
            </p>
            <a>Ler mais...</a>
        </div>
    )
}
