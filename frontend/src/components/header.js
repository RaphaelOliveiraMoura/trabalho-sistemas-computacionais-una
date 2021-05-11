import React from 'react';
import Container from './container';
import Image from './../img/logo.jpeg';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <Container>
                <div id="header-container">
                    <img id="logo" src={Image} alt="Logo"></img>
                    <nav>
                        <ul>
                            <li><Link to="/">Python</Link></li>
                            <li><Link to="/">Java</Link></li>
                            <li><Link to="/">JavaScript</Link></li>
                            <li><Link to="/">Flutter</Link></li>
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    )
}