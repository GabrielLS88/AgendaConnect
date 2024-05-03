import "./Header.css"
import { Link } from 'react-router-dom';

function Header(){
  const ClickLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <header>
      <div className="header">
        <div className="links">
          <Link id="linkMenu" to="/home">Home</Link>
          <Link id="linkMenu" to="/cliente">Agendamento</Link>
          <Link id="linkMenu" to="/horario">Histórico</Link>  
          <button id="btnLogout" onClick={ClickLogout}>Sair</button>
        </div>
        
      </div>
    </header>
  )
}

export default Header