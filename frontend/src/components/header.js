import React from 'react';
import Container from './container';
import Image from './../img/logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <Container>
                <div id="header-container">
                    <Link to="/"><img id="logo" src={Image} alt="Logo"></img></Link>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/createArticlePage">Postar um artigo</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    )
}