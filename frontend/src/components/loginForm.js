import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Footer from './footer';
import Header from './header';
import Content from './content';
import isLogged from '../utils/isLogged';
import { signIn } from '../services/api';

const errorsMap = {
  'password must have at least 8 characters':
    'A senha deve ter pelo menos 8 caracteres',
  'email is invalid': 'O email digitado não é válido',
  'email is required': 'O campo Email precisa ser preenchido',
  'password is required': 'O campo Senha precisa ser preenchido',
};

export default function LoginForm({ history }) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  useEffect(() => {
    isLogged() && history.push('/');
  }, [history]);

  async function login() {
    if (!email || !password)
      return toast.error('Preencha todos os dados corretamente');

    try {
      await signIn({
        email: email.toLowerCase(),
        password,
      });

      history.push('/');
    } catch (error) {
      const errorMessage = errorsMap[error.message] || 'Erro ao realizar login';
      return toast.error(errorMessage);
    }
  }

  return (
    <>
      <Header />
      <Content>
        <div className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            name="email"
            id="login"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          ></input>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></input>
          <input type="submit" value="Entrar" onClick={login}></input>
          <span>
            <Link to="register">Crie uma conta</Link>
          </span>
        </div>
      </Content>
      <Footer />
    </>
  );
}
