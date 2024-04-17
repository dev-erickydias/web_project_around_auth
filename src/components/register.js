import React, { useState } from 'react';
import '../blocks/login.css';
import { Link, useHistory } from 'react-router-dom';
import HeaderLoginAndRegister from './headerLogin';

import * as auth from "../utils/auth"

const Register = ({handleRegister, handleRegisterError}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault();
    auth.register(email, password)
      .then((res) => {
        if (!res.data) {
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }
  return (
    <>
      <HeaderLoginAndRegister text={'Entrar'} endpoint={'signin'} />
      <div className="containerSignIn">
        <form onSubmit={handleSubmit}>
          <div className="envolver">
            <h1>Inscrever-se</h1>
            <input type="email" required onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" value={email}/>
            <input type="password" minLength={2} required onChange={(e) => setPassword(e.target.value)} placeholder="Senha" value={password}/>
          </div>
          <div className="buttonAndMember">
            <button type="submit">Entrar</button>
            <Link to="/signin">Já é um membro? Faça login aqui!</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
