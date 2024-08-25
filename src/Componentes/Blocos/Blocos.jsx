import { useState, useEffect } from 'react';
import './Blocos.css';
import Spinner from '../Spinner/Spinner';
import Alerta from '../../Componentes/Alerta/Alerta';

const Blocos = () => {
  const token = localStorage.getItem("tokenParaReq");
  const urlParaApi = localStorage.getItem("urlPlanilha");
  const url = urlParaApi;
  const action = 'ReadPassandoMes';
  const token_acess = token;

  const obterNomeMesAtual = () => {
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    const mesAtual = new Date().getMonth();
    return meses[mesAtual];
  };

  const [data, setData] = useState([]);
  const [mes, setMes] = useState(obterNomeMesAtual);
  const [loading, setLoading] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState('');
  const [exibirAlerta, setExibirAlerta] = useState(false);

  const fetchData = async (mes) => {
    try {
      setLoading(true);
      const apiUrl = `${url}?action=${action}&token_acess=${token_acess}&mes=${mes}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setMensagemAlerta(error.message);
      setExibirAlerta(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(mes);
  }, [mes]);

  const fazerPesquisaHistorico = () => {
    const mesSelecionado = document.getElementById('opcoesPagamentoConverterLeadHistorico').value;
    setMes(mesSelecionado);
    fetchData(mesSelecionado);
  };

  const inverterDataIsoParaBr = (dataIso) => {
    if (dataIso && dataIso !== '') {
      const dateObj = new Date(dataIso);
      const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
      let dataFormatada = dateObj.toLocaleDateString('pt-BR', options);
      dataFormatada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

      return dataFormatada;
    }
    return '';
  };

  const groupDataByDate = (data) => {
    const grupoPorData = {};

    for (let i = 0; i < data.length; i++) {
      const dataBr = inverterDataIsoParaBr(data[i].data);

      if (dataBr && !grupoPorData[dataBr]) {
        grupoPorData[dataBr] = [];
      }

      if (dataBr) {
        grupoPorData[dataBr].push({
          nome: data[i].nomecliente,
          data: dataBr,
          valor: data[i].valor,
          horarioinicial: data[i].horarioinicial,
          horariofinal: data[i].horariofinal,
          descricao: data[i].descricao,
          pagamento: data[i].pagamento,
          id: data[i].id,
          status: data[i].status,
        });
      }
    }
    return grupoPorData;
  };

  const funcaoExcluirLead = async (id) => {
    console.log(id);
    const token = localStorage.getItem("tokenParaReq");
    const urlParaApi = localStorage.getItem("urlPlanilha");
    const mesSelecionado = document.getElementById('opcoesPagamentoConverterLeadHistorico').value;
    console.log(mesSelecionado);

    try {
      const response = await fetch(`${urlParaApi}?token_acess=${token}&action=DeletePorMes&id=${id}&mesParaDeletar=${mesSelecionado}`, {
        method: 'GET',
        redirect: 'follow'
      });

      console.log(`Response status: ${response.status}`);
      const result = await response.text();
      console.log(`Response text: ${result}`);

      if (response.ok) {
        setMensagemAlerta('Agendamento excluído com sucesso.');
        fetchData(mesSelecionado);
      } else {
        throw new Error(result);
      }

      setExibirAlerta(true);
    } catch (error) {
      console.error(`Erro ao excluir Agendamento: ${error.message}`);
      setMensagemAlerta(error.message);
      setExibirAlerta(true);
    }
  };


  const fecharAlerta = () => {
    setExibirAlerta(false);
    setMensagemAlerta('');
  };

  const ordenarPorData = (grupoPorData) => {
    const datasOrdenadas = Object.keys(grupoPorData).sort((a, b) => {
      const dataA = new Date(a.split('/').reverse().join('/'));
      const dataB = new Date(b.split('/').reverse().join('/'));
      return dataA - dataB;
    });

    const grupoOrdenado = {};
    datasOrdenadas.forEach((data) => {
      grupoOrdenado[data] = grupoPorData[data];
    });

    return grupoOrdenado;
  };

  const ordenarHorarios = (items) => {
    return items.sort((a, b) => {
      const horarioA = a.horarioinicial.replace(':', '');
      const horarioB = b.horarioinicial.replace(':', '');
      return horarioA.localeCompare(horarioB);
    });
  };

  const processarDados = (grupoPorData) => {
    const elementosRenderizados = [];

    for (const dataBr in grupoPorData) {
      const todosValoresZero = grupoPorData[dataBr].every(objeto => Object.values(objeto).every(valor => valor === 0));
      const nomeIgualZero = grupoPorData[dataBr].some(objeto => objeto.nome === 'iahual');

      if (!todosValoresZero && !nomeIgualZero) {
        const itensOrdenados = ordenarHorarios(grupoPorData[dataBr]);
        elementosRenderizados.push(
          <div className="divPrincipal" key={dataBr}>
            <div className="nomeDataDia">{dataBr}</div>
            <div className="containerBloco">
              {itensOrdenados.map((item, index) => (
                <div key={`${dataBr}-${index}`} className="divBloco">
                  <div className='espacoDosBlocos'>
                    <div className="ladoDeCima">
                      <div id="nomeCliente" className="blocoNome">{item.nome}</div>
                      <div id="horarioInicial" className="blocoHoraInicial">
                        <div id='escritahora'>Horário:</div>
                        {item.horarioinicial ? item.horarioinicial.replace(/-/g, ':') : ''}
                        <div id='escritahora'> às </div>
                        {item.horariofinal ? item.horariofinal.replace(/-/g, ':') : ''}
                      </div>
                      {item.valor > 0 && (<div className="valorServico"><div id='escritaDiv'>Valor:</div>R${item.valor}</div>)}
                    </div>
                    <div id="ladoDeBaixo">
                      <div className="descricao"><div id='escritaDiv'>Descrição:</div>{item.descricao}</div>
                      {item.pagamento != '' && (<div className="formaDePagamento"><div id='escritaDiv'>Forma de pagamento:</div>{item.pagamento}</div>)}
                    </div>
                    <div className="espacoButtonDeleteContato">
                      <button id='btnTrashClientBlocos' onClick={() => funcaoExcluirLead(item.id)}>
                        Excluir <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

    if (elementosRenderizados.length === 0) {
      elementosRenderizados.push(
        <div className='notData'><h1>Não possui clientes agendados</h1></div>
      );
    }

    return elementosRenderizados;
  };

  const grupoPorData = groupDataByDate(data);
  const grupoOrdenado = ordenarPorData(grupoPorData);
  const elementosRenderizados = processarDados(grupoOrdenado);

  return (
    <div>
      <div className="blocoSelecaoMes">
        <div className="subBlocoSelecaoMes">
          <p>Qual mês deseja consultar?</p>
          <select id="opcoesPagamentoConverterLeadHistorico" defaultValue={mes}>
            <option value="janeiro">Janeiro</option>
            <option value="fevereiro">Fevereiro</option>
            <option value="março">Março</option>
            <option value="abril">Abril</option>
            <option value="maio">Maio</option>
            <option value="junho">Junho</option>
            <option value="julho">Julho</option>
            <option value="agosto">Agosto</option>
            <option value="setembro">Setembro</option>
            <option value="outubro">Outubro</option>
            <option value="novembro">Novembro</option>
            <option value="dezembro">Dezembro</option>
          </select>
          <button id='btnPesquisarHistorico' onClick={fazerPesquisaHistorico}>Pesquisar</button>
        </div>
        <div className="espacoLoading">
          {loading && <Spinner />} {/* Renderiza o spinner quando loading é true */}
          {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
        </div>
      </div>
      <div>
        {elementosRenderizados}
      </div>
    </div>
  );
};

export default Blocos;
