import React from 'react';
import Container from './container';

export default function Header() {
    return (
        <header>
            <Container>
                <div id="header-container">
                    <h1 id="logo">LogoBlog</h1>
                    <nav>
                        <ul>
                            <li><a href="../../public/index.html">Python</a></li>
                            <li><a href="../../public/index.html">Java</a></li>
                            <li><a href="../../public/index.html">JavaScript</a></li>
                            <li><a href="../../public/index.html">Flutter</a></li>
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    )
}