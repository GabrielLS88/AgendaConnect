import { useState } from 'react';
import Header from '../../Componentes/Header/Header';
import './Financeiro.css';
import Alerta from '../../Componentes/Alerta/Alerta';
import Grafico from '../../Componentes/Tabela/Tabela';

function Financeiro() {
  const [mensagemAlerta, setMensagemAlerta] = useState('');
  const [exibirAlerta, setExibirAlerta] = useState(false);

  const fecharAlerta = () => {
    setExibirAlerta(false);
    setMensagemAlerta('');
    window.location.href = "/home";
  };

  return (
    <div className='bodyTabela'>
      {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
      <Header />
      <div className="espacoTable">
        <div className="tamanhoDaTabela">
          <h1 id='tituloPrincipal'>Visão Geral de Ganhos</h1>
        <Grafico></Grafico>
        </div>
      </div>
    </div>
  );
}

export default Financeiro;
