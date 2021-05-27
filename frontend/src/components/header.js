import React from 'react';
import Container from './container';
import Image from './../img/logo.png';
import { Link } from 'react-router-dom';
import isLogged from '../utils/isLogged';

export default function Header() {

    function logOff() {
        localStorage.clear();
        alert("Sua conta foi desconectada");
    }
    return (
        <header>
            <Container>
                <div id="header-container">
                    <Link to="/"><img id="logo" src={Image} alt="Logo"></img></Link>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            {!isLogged() ? <li><Link to="/login">Login</Link></li> : <><li><Link to="/createArticlePage">Postar um artigo</Link></li> <li><Link to="/" onClick={logOff}>Sair</Link></li> </>}
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    )
}