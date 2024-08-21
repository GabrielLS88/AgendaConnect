import { useState } from 'react';
import Header from '../../Componentes/Header/Header';
import './Agendamento.css';
import Alerta from '../../Componentes/Alerta/Alerta';

function Agendamento() {
  const [exibirAlerta, setExibirAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [novoCliente, setNovoCliente] = useState(true);

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
      return null;
    }
  };

  const handleAgendar = async () => {
    setIsSubmitting(true);

    // Validando elementos antes de acessar suas propriedades
    const nomeInput = document.getElementById('nomeInput');
    const dataInput = document.getElementById('dataInput');
    const valorInput = document.getElementById('valorInput');
    const horaInicialInput = document.getElementById('horaInicialInput');
    const horaFinalInput = document.getElementById('horaFinalInput');
    const descricaoInput = document.getElementById('descricaoInput');
    const opcoesPagamento = document.getElementById('opcoesPagamento');

    if (!nomeInput || !dataInput || !horaInicialInput || !horaFinalInput) {
      setMensagemAlerta('Erro ao acessar elementos do formulário!');
      setExibirAlerta(true);
      setIsSubmitting(false);
      return;
    }

    const nomecliente = nomeInput.value;
    const data = dataInput.value;
    const valor = valorInput ? valorInput.value : '';
    const horarioinicial = horaInicialInput.value;
    const horariofinal = horaFinalInput.value;
    const descricao = descricaoInput ? descricaoInput.value : '';
    const pagamento = opcoesPagamento ? opcoesPagamento.value : '';
    const urlParaApi = localStorage.getItem("urlPlanilha");
    const token = localStorage.getItem("tokenParaReq");

    if (!nomecliente || !data || !horarioinicial || !horariofinal) {
      setMensagemAlerta('Alguns dados obrigatórios não foram preenchidos!');
      setExibirAlerta(true);
      setIsSubmitting(false);
      return;
    }

    const dataReversed = reverseString(data);
    const id = await coletarTamanhoId(urlParaApi, token);

    if (id === null) {
      setMensagemAlerta('Erro ao coletar ID. Tente novamente.');
      setExibirAlerta(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const requestUrl = `${urlParaApi}?action=Create&token_acess=${token}&nomecliente=${nomecliente}&data=${dataReversed}&valor=${valor}&horarioinicial=${horarioinicial}&horariofinal=${horariofinal}&descricao=${descricao}&pagamento=${pagamento}&id=`;
      const response = await fetch(requestUrl, {
        method: 'GET',
        redirect: 'follow'
      });
      const result = await response.text();
      setMensagemAlerta(result);
    } catch (error) {
      setMensagemAlerta(`Erro ao realizar o agendamento: ${error.message}`);
    } finally {
      setExibirAlerta(true);
      setIsSubmitting(false);
      resetForm(); // Chama a função para limpar o formulário
    }
  };

  const resetForm = () => {
    document.getElementById('nomeInput').value = '';
    document.getElementById('dataInput').value = '';
    document.getElementById('valorInput').value = '';
    document.getElementById('horaInicialInput').value = '';
    document.getElementById('horaFinalInput').value = '';
    document.getElementById('descricaoInput').value = '';
    if (document.getElementById('opcoesPagamento')) {
      document.getElementById('opcoesPagamento').value = '';
    }
  };

  return (
    <div className='bodyAgendamento'>
      {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
      <Header />
      <div className="corpoAgendamento">
        <div className="bodyCorpo">
          <div className='divNomeFicha'>
            <h1 className='nomeFicha'>Ficha Cliente</h1>
            <div className="espacoCheks">
              <div className="novoCliente">
                <input 
                  type="checkbox" 
                  id="novoClienteCheckbox" 
                  name="novoCliente" 
                  checked={novoCliente} 
                  onChange={() => setNovoCliente(true)} 
                />
                <p>Novo Agendamento</p>
              </div>
              <div className="clienteJaAtendido">
                <input 
                  type="checkbox" 
                  id="clienteJaAtendidoCheckbox" 
                  name="clienteJaAtendido" 
                  checked={!novoCliente} 
                  onChange={() => setNovoCliente(false)} 
                />
                <p>Atendido Finalizado</p>
              </div>
            </div>
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
            {!novoCliente && (
              <>
                <select id="opcoesPagamento">
                  <option value="">Selecione uma forma de pagamento</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Débito">Débito</option>
                  <option value="Crédito">Crédito</option>
                  <option value="Fiado">Fiado</option>
                </select>
                <input id="valorInput" type="number" placeholder="Valor" />
              </>
            )}
            <input id="descricaoInput" type="text" placeholder="Descrição" />
          </div>
          <div className="espacoBtn">
            <button 
              id="btnAgendar" 
              onClick={handleAgendar} 
              style={{ cursor: isSubmitting ? "wait" : "pointer", backgroundColor: isSubmitting? "#056e3b": "#00BF63" }} 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Aguarde..." : "Agendar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agendamento;
