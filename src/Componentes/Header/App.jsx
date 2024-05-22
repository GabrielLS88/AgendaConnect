import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

function Header() {
  const location = useLocation();

  function LogoutUsuario(){
    window.localStorage.clear()
    window.location.href = "/";
  }
  
  return (
    <header>
      <div className="header">
        <div className="links">
          <Link id="linkMenu" className={`linkHome ${location.pathname === '/home' ? 'active' : ''}`} to="/home">Home</Link>
          <p id="pipeSeparadorMenu">|</p>
          <Link id="linkMenu" className={`linkAgenda ${location.pathname === '/agenda' ? 'active' : ''}`} to="/agenda">Agendamento</Link>
          <p id="pipeSeparadorMenu">|</p>
          <Link id="linkMenu" className={`linkHistorico ${location.pathname === '/historico' ? 'active' : ''}`} to="/historico">Histórico</Link>
        </div>
        <div className="blocoLogout">
          <i class="bi bi-box-arrow-right" onClick={LogoutUsuario}></i>
      </div>
      </div>
      
    </header>
  );
}

export default Header;
