import Header from '../../Componentes/HeaderOriginal/Header';
import BlocosSemanal from '../../Componentes/BlocosSemanal/BlocoSemanal';
import Progress from '../../Componentes/Progress/App';
import './Home.css';

function Home() {
  return (
    <div className='bodyHome'>
     
      <div className="blocoTeste">
        <div className="blocosemanais">
          <BlocosSemanal/>  
        </div>
        <div className="blocoProgresso">
          <Progress/>
        </div>
        
      </div>
      <Header />
    </div>
  )
}

export default Home
