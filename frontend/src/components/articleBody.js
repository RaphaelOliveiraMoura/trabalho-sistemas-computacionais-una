import React from 'react';
import ExampleImg from './../img/post-img.jpg';


export default function ArticleBody({ post }) {
    const { description, articleBody } = post;
    return (
        <>
            <div className="article-body">
                <h4 id="description">
                    {description}
                </h4>
                <img src={ExampleImg} alt="Capa da postagem" />
                {articleBody.split(/\n/g).map((atual, i) => <p key={i}>{atual}</p>)}
            </div>
        </>
    )
}
