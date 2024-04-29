import React, { useState } from 'react';
import './SingIn.css';
import Alerta from '../../Componentes/Alerta/Alerta';
import Apresentacao from '../../Componentes/Apresentacao/Apresentacao';
import Logo from "../../assets/Sistema.jpg"

function SingIn() {
  const [passwordVisivel, setPasswordVisivel] = useState(false);
  const [exibirAlerta, setExibirAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState('');

  const converteParaTexto = () => {
    setPasswordVisivel(!passwordVisivel);
  }

  const fecharAlerta = () => {
    setExibirAlerta(false);
  };

  const ClickEntrar = () => {
    const idUser = document.getElementById('idUser').value;
    const nameUser = document.getElementById('nameUser').value;
    const passwordUser = document.getElementById('passwordUser').value;

    if (idUser === "" || nameUser === "" || passwordUser === "") {
      setMensagemAlerta('Por favor, preencha todos os campos antes de prosseguir o login.');
      setExibirAlerta(true);
    }else if(idUser != "123" || nameUser != "123" || passwordUser != "123"){
      setMensagemAlerta('Usuário ou senha incorretos.');
      setExibirAlerta(true);
    }else if(idUser === "123" || nameUser === "123" || passwordUser === "123"){
      const token = "Autorizado";
      localStorage.setItem("token", token);
      window.location.href = "/home";
    }else {
      setExibirAlerta(false);
    }
  }

  return (
    <div className='bodySingIn'>
      {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
      <div className="ladoLogin">
        <div className="boxLogin">
          <h2 id='tituloBoxLogin'>LOGIN</h2>
          <input id='idUser' className='inputSingLogin' type="text" placeholder='Id' />
          <input id='nameUser' className='inputSingLogin' type="text" placeholder='Usuário' />
          <div className="divInputPasswordLogin">
            <input id='passwordUser' className='inputSingPassowordLogin' type={passwordVisivel ? "text" : "password"} placeholder='Senha' /><i id='btnVizualizarPasswordLogin' className="bi bi-eye-fill" onClick={converteParaTexto}></i>
          </div>
          <button className='btnEntrarLogin' onClick={ClickEntrar}>Entrar</button>
          <div className="blocoLinksLogin">
            <a id='linksBoxLogin1' href="#">Esqueceu a senha?</a>
            <a id='linksBoxLogin2' href="/singup">Novo Cliente?</a>
          </div>
        </div>
      </div>

      <div className="ladoComentariosLogin">
        <Apresentacao Logo={Logo} />
      </div>
    </div>
  )
}

export default SingIn;
