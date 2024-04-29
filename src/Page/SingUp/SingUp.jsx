import { useState } from 'react'
import './SingUp.css'
import Alerta from '../../Componentes/Alerta/Alerta';
import Apresentacao from '../../Componentes/Apresentacao/Apresentacao';
import Logo from "../../assets/Sistema.jpg"
function SingUp() {
  const [passwordVisivel, setPasswordVisivel] = useState(false);
  const [exibirAlerta, setExibirAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState('');

  const converteParaTexto = () => {
    setPasswordVisivel(!passwordVisivel);
  }

  const fecharAlerta = () => {
    setExibirAlerta(false);
  };

  const ClickCadastrar = () => {
    const idUser = document.getElementById('idUser').value;
    const nameUser = document.getElementById('nameUser').value;
    const passwordUser = document.getElementById('passwordUser').value;

    if (idUser === "" || nameUser === "" || passwordUser === "") {
      setMensagemAlerta('Por favor, preencha todos os campos antes de prosseguir o cadastro.');
      setExibirAlerta(true);
    } else {
      setExibirAlerta(false);
    }
  }

  return (
   <div className='bodySingUp'>
    {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
    <div className="ladoCadastro">
      <div className="boxCadastro">
        <h2 id='tituloBoxCadastro'>Cadastrar</h2>
        <input id='idUser' className='inputSingCadastro' type="text" placeholder='Nome' />
        <input id='nameUser' className='inputSingCadastro' type="text" placeholder='E-mail' />
        <div className="divInputPasswordCadastro">
          <input id='passwordUser' className='inputSingPassowordCadastro'  type={passwordVisivel ? "text" : "password"} placeholder='Senha' /><i id='btnVizualizarPasswordCadastro' class="bi bi-eye-fill" onClick={converteParaTexto}></i>
        </div>
        <button onClick={ClickCadastrar} className='btnCadastro'>Cadastrar</button>
        <div className="blocoLinksCadastro">
          <a id='linksBoxCadastro' href="/">Ja sou cliente?</a>
        </div>
      </div>
    </div>

    <div className="ladoComentariosCadastro">
      <Apresentacao Logo={Logo} />
    </div>
   </div>
  )
}

export default SingUp
