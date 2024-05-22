import React, { useState } from 'react';
import './Header.css';
import Alerta from '../Alerta/Alerta';

function Header() {
  const [exibirAlerta, setExibirAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState('');

  const ClickLogout = () => {
    localStorage.clear();
  }

  const fecharAlerta = () => {
    setExibirAlerta(false);
  };

  const NotificacaoSino = () => {
    setMensagemAlerta('Você ainda não possui notificações!');
    setExibirAlerta(true);
  }

  const OpenMenu = () => {
    let menu = document.querySelector('.blocoMenu');
    const isOpen = menu.classList.contains('show');
  
    if (isOpen) {
      menu.classList.remove('show');
      menu.classList.add('hide');
    } else {
      menu.classList.remove('hide');
      menu.classList.add('show');
    }
  }
  


  return (
    <div className='bodyHeader'>
      {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
      <div className='menuParteDeCima'>

        <div className="divIconeMenu">
          <i class="bi bi-list" id='iconMenu' onClick={OpenMenu}></i>
          <div className="blocoNomeMarca">
             <p id='marca'>Agenda Connect</p>
          </div>
        </div>
        <div className="perfilIcones">
          <i id='iconesPerfilSino' onClick={NotificacaoSino} class="bi bi-bell-fill"></i>
        </div>

      </div>
      <div className="blocoMenu">
        <div className="blocoLinks">
          <div id='divLinks'><a id='linksMenu' href="/home">Home</a></div>
          <div id='divLinks'><a id='linksMenu' href="/agenda">Agendamento</a></div>
          <div id='divLinks'><a id='linksMenu' href="/historico">Historico</a></div>
          <div id='divLinks'><a id='linksMenu' href="/home">Produtos</a></div>
          <div id='divLinks'><a id='linksMenu' onClick={ClickLogout} href="/">Sair</a></div>
        </div>
       
      </div>
    </div>
  );
}

export default Header;
