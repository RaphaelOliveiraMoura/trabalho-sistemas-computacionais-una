import React, { useState } from 'react';
import Footer from './footer';
import Header from './header';
import { Redirect } from 'react-router-dom';

export default function RegisterForm() {
    const [email, setemail] = useState("");
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    async function registerUser() {
        //Validações dos campos de formulário
        if (!name || !email || !password || !confirmPassword) {
            return alert("Todos os campos devem ser preenchidos");
        };

        if (!validateEmail(email)) {
            return alert("O email digitado não é válido");
        };

        if (password.length < 8) {
            return alert("A senha deve ter pelo menos 8 caracteres");
        };

        if (password !== confirmPassword) {
            return alert("A senha digitada é diferente da confirmação de senha");
        };

        const user = { email: email.toLowerCase(), name: name, password: password, confirmPassword: confirmPassword };

        const baseUrl = "http://54.234.248.140:3333/signup";
        const req = await fetch(baseUrl, {
            method: 'POST',
            headers: { "Content-type": "Application/json" },
            body: JSON.stringify(user)
        });

        const responseJson = await req.json();

        if (req.status === 400) {
            switch (responseJson.error) {
                case "user already exists":
                    alert("Esse email já pertence a uma conta");
                    break;
                case "password must have at least 8 characters":
                    alert("A senha deve ter pelo menos 8 caracteres");
                    break;
                case "password and confirmPassword unmatch":
                    alert("A senha digitada é diferente da confirmação de senha");
                    break;
                case "email is invalid":
                    alert("O email digitado não é válido");
                    break;
                case "name is required":
                    alert("O campo Nome precisa ser preenchido");
                    break;
                case "email is required":
                    alert("O campo Email precisa ser preenchido");
                    break;
                case "password is required":
                    alert("O campo Senha precisa ser preenchido");
                    break;
                default:
                    alert("Por favor, confira se todos os campos foram digitados corretamente")
            }
        };

        if (req.status === 200) {
            alert("Conta Criada com Sucesso");
            setRedirect(true);
        };
    }

    function validateEmail(email) {
        const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return EMAIL_REGEX.test(email)
    }

    function setValues(e) {
        const target = e.target;
        const named = target.name;
        switch (named) {
            case "email":
                setemail(target.value);
                break;
            case "name":
                setname(target.value);
                break;
            case "password":
                setpassword(target.value);
                break;
            case "confirmPassword":
                setconfirmPassword(target.value);
                break;
            default:
        };
    }

    return (
        <>
            <Header />
            <div className="login-form">
                <h2>Criar Conta</h2>
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => setValues(e)}
                    value={email}>
                </input>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nome de Usuário"
                    onChange={(e) => setValues(e)}
                    value={name}>
                </input>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Senha"
                    onChange={(e) => setValues(e)}
                    value={password}>
                </input>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    placeholder="Confirmar senha"
                    onChange={(e) => setValues(e)}
                    value={confirmPassword}>
                </input>
                <input type="submit" value="Criar Conta" onClick={registerUser}></input>
            </div>
            {!!redirect ? <Redirect to="/login" /> : ""}
            <Footer />
        </>
    )
}