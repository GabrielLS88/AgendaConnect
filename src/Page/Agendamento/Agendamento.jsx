import React, { useState, useEffect } from 'react';
import Header from '../../Componentes/HeaderOriginalAtual/Header';
import './Agendamento.css';
import Alerta from '../../Componentes/Alerta/Alerta';

function Agendamento() {
  const [exibirAlerta, setExibirAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState('');
  const [dados, setDados] = useState([]);
  
  const apiUrl = 'https://script.google.com/macros/s/AKfycbxRE8ajIdxssCdXFmIqYKJnqCi4kEDSCd6ACNih3drnliPCxIYQcwVAsUlCCjwL4oBUpw/exec';
  const token_acess = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  useEffect(() => {
    const fetchData = async () => {
      const action = 'ColetarId';
      const apiUrlMontada = `${apiUrl}?action=${action}&token_acess=${token_acess}`;

      try {
        const response = await fetch(apiUrlMontada);
        if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.status}`);
        }
        const jsonData = await response.json();
        setDados(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [apiUrl]);

  const handleAgendar = async () => {
    // Obter dados dos campos de entrada
    const nomecliente = document.getElementById('nomeInput').value;
    const data = document.getElementById('dataInput').value;
    const valor = document.getElementById('valorInput').value;
    const horarioinicial = document.getElementById('horaInicialInput').value;
    const horariofinal = document.getElementById('horaFinalInput').value;
    const descricao = document.getElementById('descricaoInput').value;
    const pagamento = document.getElementById('opcoesPagamento').value;

    // Verificar se todos os campos estão preenchidos
    if (nomecliente === '' || data === '' || horariofinal === '' || horarioinicial === '' || descricao === '') {
      setMensagemAlerta('Alguns dados não foram preenchidos!');
      setExibirAlerta(true);
      return;
    }

    // Construir parâmetros da requisição
    const params = new URLSearchParams({
      action: 'Create',
      token_acess: token_acess,
      nomecliente,
      data,
      valor,
      horarioinicial,
      horariofinal,
      descricao,
      pagamento,
      id: dados.length + 1, // Gerar ID baseado no comprimento dos dados
    });

    try {
      // Enviar requisição para a API usando método POST
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      // Verificar se a requisição foi bem-sucedida
      if (response.ok) {
        setMensagemAlerta('Cadastro feito com sucesso...');
        setExibirAlerta(true);
      } else {
        setMensagemAlerta('Falha no cadastro. Tente novamente!');
        setExibirAlerta(true);
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
      setMensagemAlerta('Erro ao enviar requisição. Verifique sua conexão de internet e tente novamente.');
      setExibirAlerta(true);
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
