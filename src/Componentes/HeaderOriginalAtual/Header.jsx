import { useState } from 'react';
import './Header.css';
function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  const ClickLogout = () => {
    localStorage.clear();
  };
  const OpenMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <div className='bodyHeader'>
      <div className='menuParteDeCima'>
        <div className="divIconeMenu">
          <i
            className={menuAberto ? "bi bi-x" : "bi bi-list"}
            id='iconMenu'
            onClick={OpenMenu}
          ></i>
          <div className="blocoNomeMarca">
            <p id='marca'>Agenda Connect</p>
          </div>
        </div>
      </div>
      <div className={`blocoMenu ${menuAberto ? 'show' : 'hide'}`}>
        <div className="blocoLinks">
          <div id='divLinks'><a id='linksMenu' href="/home">Home</a></div>
          <div id='divLinks'><a id='linksMenu' href="/agenda">Agendamento</a></div>
          <div id='divLinks'><a id='linksMenu' href="/historico">Historico</a></div>
          <div id='divLinks'><a id='linksMenu' href="/home">Produtos</a></div>
          <div id='divLinks'><a id='linksMenu' href="/home">Financeiro</a></div>
          <div id='divLinks'><a id='linksMenu' onClick={ClickLogout} href="/">Sair</a></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
