import "./Header.css"
import { Link } from 'react-router-dom';

function Header(){
  return (
    <header>
      <div className="header">
        <div className="links">
          <Link id="linkMenu" to="/home">Home</Link>
          <Link id="linkMenu" to="/cliente">Agendamento</Link>
          <Link id="linkMenu" to="/horario">Histórico</Link>  
        </div>
      </div>
    </header>
  )
}

export default Header