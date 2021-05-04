import React from 'react'
import Container from './container'

export default function Header(props) {
    return (
        <header>
            <Container>
                <div id="header-container">
                    <h1 id="logo">LogoBlog</h1>
                    <nav>
                        <ul>
                            <li><a>Python</a></li>
                            <li><a>Java</a></li>
                            <li><a>JavaScript</a></li>
                            <li><a>Flutter</a></li>
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    )
}