import Header from '../../Componentes/Header/App'
import Blocos from '../../Componentes/Blocos/Blocos'
import Progress from '../../Componentes/Progress/App';
import './Historico.css'

function Horario() {
  return (
    <div className='bodyHistorico'>
      <Header/>
       <div className="bodyCentral">
          <div className="divBory">
             <Blocos></Blocos>
           </div>
           <div className="divBarraProgress">
             <div><Progress /></div>
           </div>
       </div>
    </div>
  )
}

export default Horario
