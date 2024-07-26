import { useState } from 'react';
import Header from '../../Componentes/HeaderOriginalAtual/Header';
import './Agendamento.css';
import Alerta from '../../Componentes/Alerta/Alerta';

function Agendamento() {
  const [exibirAlerta, setExibirAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState('');

  const fecharAlerta = () => {
    setExibirAlerta(false);
    setMensagemAlerta('');
  };

  const reverseString = (str) => {
    return str.split('-').reverse().join('-');
  };

  const coletarTamanhoId = async (urlParaApi, token) => {
    try {
      const response = await fetch(`${urlParaApi}?action=ColetarId&token_acess=${token}`, {
        method: 'GET',
        redirect: 'follow'
      });
      const result = await response.json();
      return result.length;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };

  const handleAgendar = async () => {
    const nomecliente = document.getElementById('nomeInput').value;
    const data = document.getElementById('dataInput').value;
    const valor = document.getElementById('valorInput').value;
    const horarioinicial = document.getElementById('horaInicialInput').value;
    const horariofinal = document.getElementById('horaFinalInput').value;
    const descricao = document.getElementById('descricaoInput').value;
    const pagamento = document.getElementById('opcoesPagamento').value;
    const urlParaApi = localStorage.getItem("urlPlanilha");
    const token = localStorage.getItem("tokenParaReq");
    const id = await coletarTamanhoId(urlParaApi, token);

    if (!nomecliente || !data || !horarioinicial || !horariofinal) {
      setMensagemAlerta('Alguns dados não foram preenchidos!');
      setExibirAlerta(true);
      return;
    }

    const dataReversed = reverseString(data);

    try {
      const response = await fetch(`${urlParaApi}?action=Create&token_acess=${token}&nomecliente=${nomecliente}&data=${dataReversed}&valor=${valor}&horarioinicial=${horarioinicial}&horariofinal=${horariofinal}&descricao=${descricao}&pagamento=${pagamento}&id=${id}`, {
        method: 'GET',
        redirect: 'follow'
      });
      const result = await response.text();
      console.log(result);
      setMensagemAlerta('Agendamento realizado com sucesso!');
      setExibirAlerta(true);
    } catch (error) {
      setMensagemAlerta(`Erro ao realizar o agendamento: ${error.message}`);
      setExibirAlerta(true);
    }
  };

  return (
    <div className='bodyAgendamento'>
      {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
      <Header />
      <div className="corpo">
        <div className="body">
          <div className='divNomeFicha'>
            <h1 className='nomeFicha'>Ficha Cliente</h1>
          </div>
          <div className="namesInput">
            <input id="nomeInput" type="text" placeholder="Nome" />
            <input id="dataInput" type="date" />
            <div className='divInputHoras'>
              <input
                id="horaInicialInput"
                type="time"
                name="appt"
                min="09:00"
                max="18:00"
                required
              />
              <input
                id="horaFinalInput"
                type="time"
                name="appt"
                min="09:00"
                max="18:00"
                required
              />
            </div>
            <select id="opcoesPagamento">
              <option value="">Selecione uma forma de pagamento</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Débito">Débito</option>
              <option value="Crédito">Crédito</option>
              <option value="Fiado">Fiado</option>
            </select>
            <input id="valorInput" type="number" placeholder="Valor" />
            <input id="descricaoInput" type="text" placeholder="Descrição" />
          </div>
          <div className="espacoBtn">
            <button id="btnAgendar" onClick={handleAgendar}>
              Agendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agendamento;
