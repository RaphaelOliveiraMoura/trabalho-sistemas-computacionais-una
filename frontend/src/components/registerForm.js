import React from 'react';
import Footer from './footer';
import Header from './header';

export default function RegisterForm() {
    return (
        <>
            <Header />
            <form className="login-form">
                <h2>Criar Conta</h2>
                <input type="text" name="login" id="login" placeholder="Email" ></input>
                <input type="password" name="password" id="password" placeholder="Senha" ></input>
                <input type="password" name="confirm-password" id="password" placeholder="Confirmar Senha" ></input>
                <input type="submit" value="Criar Conta"></input>

            </form>
            <Footer />
        </>
    )
}