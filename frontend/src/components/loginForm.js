import React, { useState } from 'react';
import Footer from './footer';
import Header from './header';
import { Link, Redirect } from 'react-router-dom';
import Content from './content';
import isLogged from '../utils/isLogged';

export default function LoginForm() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    async function login() {
        if (!email || !password) {
            return alert("Todos os campos precisam ser preenchidos");
        }
        const login = { email: email.toLowerCase(), password: password };
        const baseUrl = "http://54.234.248.140:3333/signin";
        const req = await fetch(baseUrl, {
            method: 'POST',
            headers: { "Content-type": "Application/json" },
            body: JSON.stringify(login)
        });
        const responseJson = await req.json();
        if (req.status === 401 || req.status === 400) {
            alert("Email ou senha inválidos");
        };

        if (req.status === 200) {
            localStorage.setItem("tkn", `${responseJson.token}`);
            setRedirect(isLogged());
        };
    }

    return (
        <>
            <Header />
            <Content>
                <div className="login-form">
                    <h2>Login</h2>
                    <input type="text" name="email" id="login" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)}></input>
                    <input type="password" name="password" id="password" placeholder="Senha" value={password} onChange={(e) => setpassword(e.target.value)}></input>
                    <input type="submit" value="Entrar" onClick={login}></input>
                    <span><Link to="register">Crie uma conta</Link></span>
                </div>
                {!!redirect ? <Redirect to="/" /> : ""}
            </Content>
            <Footer />
        </>
    )
}