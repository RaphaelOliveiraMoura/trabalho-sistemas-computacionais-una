import React from 'react';
import { Link } from 'react-router-dom';

import Image from './../img/logo.png';
import isLogged from '../utils/isLogged';
import Container from './container';

export default function Header() {
  function logOff() {
    localStorage.clear();
  }

  function mountOptions() {
    if (!isLogged()) {
      return (
        <li>
          <Link to="/login">Login</Link>
        </li>
      );
    }

    return (
      <>
        <li>
          <Link to="/createArticlePage">Postar um artigo</Link>
        </li>
        <li>
          <Link to="/" onClick={logOff}>
            Sair
          </Link>
        </li>
      </>
    );
  }

  return (
    <header>
      <Container>
        <div id="header-container">
          <Link to="/">
            <img id="logo" src={Image} alt="Logo"></img>
          </Link>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {mountOptions()}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
