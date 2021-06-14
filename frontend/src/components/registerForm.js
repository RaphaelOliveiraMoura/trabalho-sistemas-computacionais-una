import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Footer from './footer';
import Header from './header';

import { signUp } from '../services/api';

const errorsMap = {
  'user already exists': 'Esse email já pertence a uma conta',
  'password must have at least 8 characters':
    'A senha deve ter pelo menos 8 caracteres',
  'password and confirmPassword unmatch':
    'A senha digitada é diferente da confirmação de senha',
  'email is invalid': 'O email digitado não é válido',
  'name is required': 'O campo Nome precisa ser preenchido',
  'email is required': 'O campo Email precisa ser preenchido',
  'password is required': 'O campo Senha precisa ser preenchido',
};

export default function RegisterForm({ history }) {
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function registerUser() {
    try {
      setLoading(true);
      await signUp({
        email: email.toLowerCase(),
        name: name,
        password: password,
        confirmPassword: confirmPassword,
      });

      history.push('/login');

      return toast.success('Usuário criado com sucesso');
    } catch (error) {
      const errorMessage =
        errorsMap[error.message] || 'Erro ao realizar cadastro';
      return toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function setValues(e) {
    const target = e.target;
    const named = target.name;
    switch (named) {
      case 'email':
        setemail(target.value);
        break;
      case 'name':
        setname(target.value);
        break;
      case 'password':
        setpassword(target.value);
        break;
      case 'confirmPassword':
        setconfirmPassword(target.value);
        break;
      default:
    }
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
          value={email}
        ></input>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nome de Usuário"
          onChange={(e) => setValues(e)}
          value={name}
        ></input>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
          onChange={(e) => setValues(e)}
          value={password}
        ></input>
        <input
          type="password"
          name="confirmPassword"
          id="confirm-password"
          placeholder="Confirmar senha"
          onChange={(e) => setValues(e)}
          value={confirmPassword}
        ></input>
        <input
          type="submit"
          value="Criar Conta"
          disabled={loading}
          onClick={registerUser}
        ></input>
      </div>
      <Footer />
    </>
  );
}
