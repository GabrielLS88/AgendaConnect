import React, { useState } from 'react';
import Header from '../../Componentes/HeaderOriginalAtual/Header';
import './Agendamento.css';
import Alerta from '../../Componentes/Alerta/Alerta';

function Agendamento() {
  const [exibirAlerta, setExibirAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState('');

  const handleAgendar = async () => {
    const nomecliente = document.getElementById('nomeInput').value;
    const data = document.getElementById('dataInput').value;
    const valor = document.getElementById('valorInput').value;
    const horarioinicial = document.getElementById('horaInicialInput').value;
    const horariofinal = document.getElementById('horaFinalInput').value;
    const descricao = document.getElementById('descricaoInput').value;
    const pagamento = document.getElementById('opcoesPagamento').value;

    if(nomecliente == '' || data == '' || valor == '' || horariofinal == '' || horarioinicial == '' || descricao == '' || pagamento == ''){
      setMensagemAlerta('Alguns dados não foram preenchidos!');
      setExibirAlerta(true);
    } else{

    const apiUrl =
    'https://script.google.com/macros/s/AKfycbxNaQ9ty8v0t7N0QHX9RdIdpfeeB7G5kf6-uy0MgpkBMDP_n-MUR_xryGjnkpHioHCg3Q/exec';

    const params = new URLSearchParams({
      action: 'Create',
      token_acess: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      nomecliente,
      data,
      valor,
      horarioinicial,
      horariofinal,
      descricao,
      pagamento,
    });

  try {
    const response = await fetch(`${apiUrl}?${params.toString()}`, {
      method: 'GET',
    });

    if (response.ok) {
      setMensagemAlerta('Cadastro feito com sucesso...');
      setExibirAlerta(true);
    } else {
      setMensagemAlerta('Falha no cadastro. Tente novamente!');
      setExibirAlerta(true);
    }

  } catch (error) {
    setMensagemAlerta('Error:', error);
      setExibirAlerta(true);
  }
  }
  };

  const fecharAlerta = () => {
    setExibirAlerta(false);
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
