import "./App.css"
import { Link } from 'react-router-dom';

function Header(){
  return (
    <header>
      <div className="header">
        <div className="links">
          <Link id="linkMenu" to="/home">Home</Link>
          <p id="pipeSeparadorMenu">|</p>
          <Link id="linkMenu" to="/agenda">Agendamento</Link>
          <p id="pipeSeparadorMenu">|</p>
          <Link id="linkMenu" to="/historico">Histórico</Link>  
        </div>
      </div>
    </header>
  )
}

export default Header