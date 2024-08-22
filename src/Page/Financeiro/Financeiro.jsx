import { useState} from 'react';
import Header from '../../Componentes/Header/Header';
import './Financeiro.css';
import Alerta from '../../Componentes/Alerta/Alerta';
import Grafico from '../../Componentes/Graficos/Graficos';

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
          <Grafico></Grafico>
          <Grafico></Grafico>
        </div>
      </div>
    </div>
  );
}

export default Home;
