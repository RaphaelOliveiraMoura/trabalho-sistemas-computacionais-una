import React from 'react';
import Container from './container';
import Image from './../img/logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <Container>
                <div id="header-container">
                    <img id="logo" src={Image} alt="Logo"></img>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/createArticlePage">Postar um artigo</Link></li>
                            <li><Link to="/">Sobre</Link></li>
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    )
}