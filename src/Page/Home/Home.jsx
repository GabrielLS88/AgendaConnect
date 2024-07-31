import { useState} from 'react';
import Header from '../../Componentes/Header/Header';
import BlocosSemanal from '../../Componentes/BlocosSemanal/BlocoSemanal';
import './Home.css';
import Alerta from '../../Componentes/Alerta/Alerta';

function Home() {
  const [mensagemAlerta, setMensagemAlerta] = useState('');
  const [exibirAlerta, setExibirAlerta] = useState(false);

  const fecharAlerta = () => {
    setExibirAlerta(false);
    setMensagemAlerta('');
    window.location.href = "/home";
  };

  return (
    <div className='bodyHome'>
     {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
      <Header />
      <div className="subBlocoPrincipal">
        <div className="blocosemanais">
          <BlocosSemanal />  
        </div>
      </div>
    </div>
  );
}

export default Home;
