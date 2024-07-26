import { useState } from 'react';
import './Blocos.css';
import Spinner from '../Spinner/Spiner'; // Corrigi o caminho para Spinner

const Blocos = () => {
  const token = localStorage.getItem("tokenParaReq");
  const urlParaApi = localStorage.getItem("urlPlanilha");
  const url = urlParaApi;
  const action = 'ReadPassandoMes';
  const token_acess = token;

  const [data, setData] = useState([]);
  const [mes, setMes] = useState('janeiro');
  const [loading, setLoading] = useState(false);

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
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fazerPesquisaHistorico = () => {
    const mesSelecionado = document.getElementById('opcoesPagamentoConverterLead').value;
    console.log(mesSelecionado)
    setMes(mesSelecionado);
    fetchData(mesSelecionado);
  };

  const inverterDataIsoParaBr = (dataIso) => {
    if (dataIso !== 0 && dataIso !== '') {
      const parteData = dataIso.split('T')[0];
      const [ano, mes, dia] = parteData.split('-');
      const dataBr = `${dia}/${mes}/${ano}`;
      return dataBr;
    }
    return undefined;
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

  const processarDados = (grupoPorData) => {
    const elementosRenderizados = [];

    for (const dataBr in grupoPorData) {
      const todosValoresZero = grupoPorData[dataBr].every(objeto => Object.values(objeto).every(valor => valor === 0));
      const nomeIgualZero = grupoPorData[dataBr].some(objeto => objeto.nome === 'iahual');

      if (!todosValoresZero && !nomeIgualZero) {
        elementosRenderizados.push(
          <div className="divPrincipal" key={dataBr}>
            <div className="nomeDataDia">{dataBr}</div>
            <div className="containerBloco">
              {grupoPorData[dataBr].map((item, index) => (
                <div key={`${dataBr}-${index}`} className="divBloco">
                  <div className='espacoDosBlocos'>
                    <div className="ladoDeCima">
                      <div id="nomeCliente" className="blocoNome">{item.id} - {item.nome}</div>
                      <div id="horarioInicial" className="blocoHoraInicial">
                        <div id='escritahora'>Horário das</div>
                        {item.horarioinicial ? item.horarioinicial.replace(/-/g, ':') : ''}
                        <div id='escritahora'> ás </div>
                        {item.horariofinal ? item.horariofinal.replace(/-/g, ':') : ''}
                      </div>
                      <div className="valorServico"><div id='escritaDiv'>Valor:</div>R${item.valor}</div>
                    </div>
                    <div id="ladoDeBaixo">
                      <div className="descricao"><div id='escritaDiv'>Descrição:</div>{item.descricao}</div>
                      <div className="formaDePagamento"><div id='escritaDiv'>Forma de pagamento:</div>{item.pagamento}</div>
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
          <p>Por favor selecione o mês que deseja consultar</p>
          <select id="opcoesPagamentoConverterLead" defaultValue={mes}>
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
        </div>
      </div>
      <div>
        {elementosRenderizados}
      </div>
    </div>
  );
};

export default Blocos;
