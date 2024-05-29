import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import Alerta from '../Alerta/Alerta';

function Header() {
  const [exibirAlerta, setExibirAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const ClickLogout = () => {
    localStorage.clear();
  };

  const fecharAlerta = () => {
    setExibirAlerta(false);
  };

  const NotificacaoSino = () => {
    setMensagemAlerta('Você ainda não possui notificações!');
    setExibirAlerta(true);
  };

  const OpenMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className='bodyHeader'>
      {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
      <div className='menuParteDeCima'>

        <div className="divIconeMenu">
          <i className="bi bi-list" id='iconMenu' onClick={OpenMenu}></i>
          <div className="blocoNomeMarca">
             <p id='marca'>Agenda Connect</p>
          </div>
        </div>
        <div className="perfilIcones">
          <i id='iconesPerfilSino' onClick={NotificacaoSino} className="bi bi-bell-fill"></i>
        </div>

      </div>
      <div className={`blocoMenu ${menuAberto ? 'show' : 'hide'}`} ref={menuRef}>
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
