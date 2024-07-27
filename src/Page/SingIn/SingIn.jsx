import { useState } from 'react';
import './SignIn.css';
import Alerta from '../../Componentes/Alerta/Alerta';

function SingIn() {
  const [passwordVisivel, setPasswordVisivel] = useState(false);
  const [exibirAlerta, setExibirAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState('');
  const [loading, setLoading] = useState(false);

  const converteParaTexto = () => {
    setPasswordVisivel(!passwordVisivel);
  };

  const fecharAlerta = () => {
    setExibirAlerta(false);
  };

  const consultarUsuario = (nameUser, passwordUser) => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    return fetch(`https://script.google.com/macros/s/AKfycbz4S5jMTlrz-N9HP2zTjixlzruZgR2vI7kB4kkyFUyohjQRaAapWLknfCPHxyJS5MER/exec?action=Read&token_acess=ojHHaUgrvgMl4DILfPIkOqztM0hCM57uRvreLLzC81T7Hel8eWBsbKfZ5Et8fKlE&user=${nameUser}&password=${passwordUser}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(error => {
        console.log('error', error);
        return { success: false };
      });
  };

  const ClickEntrar = () => {
    const nameUser = document.getElementById('nameUser').value;
    const passwordUser = document.getElementById('passwordUser').value;

    if (nameUser === "" || passwordUser === "") {
      setMensagemAlerta('Por favor, preencha todos os campos antes de prosseguir o login.');
      setExibirAlerta(true);
    } else {
      setLoading(true);
      consultarUsuario(nameUser, passwordUser).then(result => {
        setLoading(false);
        if(result.nomedeacesso != undefined){
            localStorage.setItem("token", "Autorizado");
            localStorage.setItem("nameUser",result.nomedeacesso);
            localStorage.setItem("urlPlanilha", result.urlplanilha);
            localStorage.setItem("tokenParaReq", result.token);
            window.location.href = "/home";
        }
         else {
          setMensagemAlerta('Login falhou. Por favor, verifique suas credenciais.');
          setExibirAlerta(true);
        }
      });
    }
  };

  return (
    <div className='bodySingIn'>
      {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
      <div className="ladoLogin">
        <div className="boxLogin">
          <h2 id='tituloBoxLogin'>Login</h2>
          <input id='nameUser' className='inputSingLogin' type="text" disabled={loading}  placeholder='Usuário' />
          <div className="divInputPasswordLogin">
            <input id='passwordUser' className='inputSingPasswordLogin' style={{ pointerEvents: loading ? 'none' : 'auto' }} type={passwordVisivel ? "text" : "password"} placeholder='Senha' />
            <i 
              id='btnVizualizarPasswordLogin' 
              className={`bi ${passwordVisivel ? "bi-eye-fill" : "bi-eye-slash-fill"}`} 
              onClick={converteParaTexto}
            ></i>
          </div>
          <button className='btnEntrarLogin' onClick={ClickEntrar} style={{cursor: loading ? "not-allowed" : "pointer"}}>Entrar</button>
          <div className="blocoLinksLogin">
            <a id='linksBoxLogin1' href="#">Esqueceu a senha?</a>
            <a id='linksBoxLogin2' href="/signup">Novo Cliente?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingIn;
