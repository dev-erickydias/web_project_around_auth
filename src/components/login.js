import React, { useState } from 'react';
import '../blocks/login.css';
import { Link } from 'react-router-dom';
import HeaderLoginAndRegister from './headerLogin';

import * as auth from "../utils/auth"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = ({handleLogin}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()
  
  function handleSubmit(e){
    e.preventDefault();
    
    auth.authorize(email, password).then(()=>{
      handleLogin(email)
      history.push("/")
    })
    
  }


  return (
    <>
      <HeaderLoginAndRegister text={'Cadastre-se'} endpoint={'signup'} />
      <div className="containerSignIn">
        <form onSubmit={handleSubmit}>
          <div className="envolver">
            <h1>Entrar</h1>
            <input type="text" onChange={(e)=>setEmail(e.target.value)} typeof="email" placeholder="E-mail" />
            <input type="password" onChange={(e)=>setPassword(e.target.value)} typeof="password" placeholder="Senha" />
          </div>
          <div className="buttonAndMember">
            <button type="submit">Entrar</button>
            <Link to="/signup">Ainda não é membro? Inscreva-se aqui!</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
