import React from 'react';
import Footer from './footer';
import Header from './header';
import { Link } from 'react-router-dom';

export default function LoginForm() {
    return (
        <>
            <Header />
            <form className="login-form">
                <h2>Login</h2>
                <input type="text" name="login" id="login" placeholder="Login" ></input>
                <input type="password" name="password" id="password" placeholder="Senha" ></input>
                <input type="submit" value="Entrar"></input>
                <span><Link to="register">Crie uma conta</Link></span>
            </form>
            <Footer />
        </>
    )
}