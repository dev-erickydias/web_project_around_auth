import React, { useState } from 'react';
import '../blocks/login.css';
import { Link } from 'react-router-dom';
import HeaderLoginAndRegister from './headerLogin';

import * as auth from "../utils/auth"

const Register = ({handleRegister, handleRegisterError}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  function handleSubmit(e) {
    e.preventDefault();
    auth.register(email, password).then((res)=>{
      if(res.data){
        handleRegister("success")
      } else {
        handleRegisterError("error")
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <>
      <HeaderLoginAndRegister text={'Entrar'} endpoint={'signin'} />
      <div className="containerSignIn">
        <form onSubmit={handleSubmit}>
          <div className="envolver">
            <h1>Inscrever-se</h1>
            <input type="text" typeof="email" onChange={setEmail} placeholder="E-mail" />
            <input type="password" typeof="password" onChange={setPassword} placeholder="Senha" />
          </div>
          <div className="buttonAndMember">
            <button type="submit">Entrar</button>
            <Link to="/">Já é um membro? Inscreva-se aqui!</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
