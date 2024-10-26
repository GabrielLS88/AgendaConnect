import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function Header() {

  const ClickLogout = () => {
    localStorage.clear();
  };

  return (
    <div className='bodyHeader'>
      <div className='menuParteDeCima'>
        <div className="divIconeMenu">
          <div className="blocoNomeMarca">
            <p id='marca'>Agenda Connect</p>
          </div>
          <div className="espacoLinks">
            
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip style={{width:'130px', height:'auto'}} id="button-tooltip">Tela inicial</Tooltip>}
            >
              <a id='linksMenu' href="/home"><i id='iconesMenu' class="bi bi-card-list"></i><p>Home</p></a>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip style={{width:'130px', height:'auto'}} id="button-tooltip">Fazer agendamento</Tooltip>}
            >
              <a id='linksMenu' href="/agenda"><i id='iconesMenu'  class="bi bi-calendar2-plus-fill"></i><p>Agendamento</p></a>
            </OverlayTrigger>
            
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip style={{width:'130px', height:'auto'}} id="button-tooltip">Vizualizar todos atendimento</Tooltip>}
            >
              <a id='linksMenu' href="/historico"><i id='iconesMenu' class="bi bi-building-fill-check"></i><p>Histórico</p></a>
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip style={{width:'130px', height:'auto'}} id="button-tooltip">Sair de sua conta</Tooltip>}
            >
               <a id='linksMenu' onClick={ClickLogout} href="/"><i id='iconesMenu'  class="bi bi-person-fill"></i><p> Sair</p></a>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
