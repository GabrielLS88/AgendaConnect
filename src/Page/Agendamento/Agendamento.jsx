import React, { useState } from 'react';
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

  const coletarTamanhoId = async () => {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwIEDc99XK5Vq9F6UjoafPVszzURr1Erzbpxo652YS8Vz8pY3FXP1zHmSbYycVS_nwE-w/exec?token_acess=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c&action=ColetarId", {
            method: 'GET',
            redirect: 'follow'
        });
        const result = await response.json(); // Parse response as JSON
        return result.length; // Return the length of the array
    } catch (error) {
        console.log('error', error);
        return null;
    }
}
  

  const handleAgendar = async () => {
    const nomecliente = document.getElementById('nomeInput').value;
    const data = document.getElementById('dataInput').value;
    const valor = document.getElementById('valorInput').value;
    const horarioinicial = document.getElementById('horaInicialInput').value;
    const horariofinal = document.getElementById('horaFinalInput').value;
    const descricao = document.getElementById('descricaoInput').value;
    const pagamento = document.getElementById('opcoesPagamento').value;
    const id = await coletarTamanhoId();

    if (!nomecliente || !data || !horarioinicial || !horariofinal || !descricao) {
      setMensagemAlerta('Alguns dados não foram preenchidos!');
      setExibirAlerta(true);
      return;
    }

    if (id === null) {
      setMensagemAlerta('Erro ao coletar ID.');
      setExibirAlerta(true);
      return;
    }

    const dataReversed = reverseString(data);

    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycbx0HQFKL7SVoqnnt6StJXKFctMCvMpA-1Ef7iw__LHQp2nfshGdBfGWYSplVYLkbneOpw/exec?action=Create&token_acess=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c&nomecliente=${nomecliente}&data=${dataReversed}&valor=${valor}&horarioinicial=${horarioinicial}&horariofinal=${horariofinal}&descricao=${descricao}&pagamento=${pagamento}&id=&status=Novo`, {
        method: 'GET',
        redirect: 'follow'
      });
      const result = await response.text();
      setMensagemAlerta('Agendamento realizado com sucesso!');
      setExibirAlerta(true);
    } catch (error) {
      setMensagemAlerta('Erro ao realizar o agendamento.');
      setExibirAlerta(true);
    }
  }

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
