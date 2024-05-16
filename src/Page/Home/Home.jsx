import Header from '../../Componentes/Header/App';
import BlocosSemanal from '../../Componentes/BlocosSemanal/BlocoSemanal';
import Progress from '../../Componentes/Progress/App';
import './Home.css';

function Home() {
  return (
    <div className='bodyHome'>
     <Header />
      <div className="blocoTeste">
        <div className="blocosemanais">
          <BlocosSemanal/>  
        </div>
        <div className="blocoProgresso">
          <Progress/>
        </div>
        
      </div>
    </div>
  )
}

export default Home
