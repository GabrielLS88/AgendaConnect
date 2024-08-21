import { useEffect, useState } from 'react';
import './BlocoSemanal.css';
import Alerta from '../../Componentes/Alerta/Alerta';
import PaperAtualizarStatus from '../../Componentes/PaperAtualizarStatus/PaperAtualizarStatus';
import Spinner from '../Spinner/Spinner';

const Blocos = () => {
  const token = localStorage.getItem("tokenParaReq");
  const urlParaApi = localStorage.getItem("urlPlanilha");
  const url = urlParaApi;
  const action = 'Read';
  const token_acess = token;

  const apiUrl = `${url}?action=${action}&token_acess=${token_acess}`;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [mensagemAlerta, setMensagemAlerta] = useState('');
  const [exibirAlerta, setExibirAlerta] = useState(false);
  const [idPaperAtualizarStatus, setIdPaperAtualizarStatus] = useState('');
  const [exibirPaperAtualizarStatus, setExibirPaperAtualizarStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false)
      } catch (error) {
        return null
      }
    };

    fetchData();
  }, [apiUrl]);

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

    data.forEach((item) => {
      const dataBr = inverterDataIsoParaBr(item.data);

      if (!grupoPorData[dataBr]) {
        grupoPorData[dataBr] = [];
      }

      if (item.status !== "concluido") {
        grupoPorData[dataBr].push({
          nome: item.nomecliente,
          data: dataBr,
          valor: item.valor,
          horarioinicial: item.horarioinicial,
          horariofinal: item.horariofinal,
          descricao: item.descricao,
          pagamento: item.pagamento,
          id: item.id,
          status: item.status
        });
      }
    });

    for (const data in grupoPorData) {
      grupoPorData[data].sort((a, b) => {
        const horarioA = a.horarioinicial.replace(':', '');
        const horarioB = b.horarioinicial.replace(':', '');
        return horarioA.localeCompare(horarioB);
      });
    }

    return grupoPorData;
  };

  const obterDataAtual = () => {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
  };

  const fecharAlerta = () => {
    setExibirAlerta(false);
    setMensagemAlerta('');
  };

  const fecharPaperAtualizarStatus = () => {
    setExibirPaperAtualizarStatus(false);
    setIdPaperAtualizarStatus('');
  };

  const chamarPaper = (idUser) => {
    setIdPaperAtualizarStatus(idUser);
    setExibirPaperAtualizarStatus(true);
  }

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

  const funcaoExcluirLead = async (id) => {
    const token = localStorage.getItem("tokenParaReq");
    const urlParaApi = localStorage.getItem("urlPlanilha");

    try {
      const response = await fetch(`${urlParaApi}?token_acess=${token}&action=Delete&id=${id}`, {
        method: 'GET',
        redirect: 'follow'
      });
      const result = await response.text();
      setMensagemAlerta(result);
      setExibirAlerta(true);
      setTimeout(function() {
        window.location.href = "/home";
      }, 3000);
    } catch (error) {
      setMensagemAlerta(error);
      setExibirAlerta(true);
    }
  };

  const processarDados = (grupoPorData, dataAtual, diasDasDatas) => {
    const elementosRenderizados = [];
    for (let i = 0; i < diasDasDatas.length; i++) {
      const data = new Date(dataAtual);
      data.setDate(data.getDate() + diasDasDatas[i]);
      const dataBr = inverterDataIsoParaBr(data.toISOString());

      if (grupoPorData[dataBr] && grupoPorData[dataBr].length > 0) {
        elementosRenderizados.push(
          <div className="divPrincipal" key={dataBr}>
            <div className="nomeDataDiaSemanal">{dataBr}</div>
            <div className="containerBlocoSemanal">
              {grupoPorData[dataBr].map((item, index) => (
                <div key={index} className="divBlocoSemanal">
                  <div className='espacoDosBlocosSemanal'>
                    <div className="ladoDeCimaSemanal">
                      <div id="nomeCliente" className="blocoNomeSemanal"><div id='escritaDivSemanal'>Cliente:</div> {item.nome}</div>
                      <div id="horarioInicial" className="blocoHoraInicialSemanal">
                        <div id='escritahoraSemanal'>Horário:</div>
                        {item.horarioinicial ? item.horarioinicial.replace(/-/g, ':') : ''} 
                        <div id='escritahoraSemanal'> às </div>
                        {item.horariofinal ? item.horariofinal.replace(/-/g, ':') : ''}
                      </div>
                      <div className="valorDescricaoSemanal"><div id='escritaDivSemanal'>Descrição:</div>{item.descricao}</div>
                    </div>
                    <div className="espacoButtonDeleteContato">
                      <button id='btnCheckFinishClient' onClick={() => chamarPaper(item.id)}>
                        Finalizar <i className="bi bi-person-check"></i>
                      </button>
                      <button id='btnTrashClient' onClick={() => funcaoExcluirLead(item.id)}>
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
        <div className='notData' key='noData'><h1>Não possui clientes agendados</h1></div>
      );
    }
    return elementosRenderizados;
  };

  const grupoPorData = groupDataByDate(data);
  const grupoOrdenado = ordenarPorData(grupoPorData);
  const dataAtual = obterDataAtual();

  return (
    <div>
      {loading && <Spinner />}
      {data.length > 0 ? processarDados(grupoOrdenado, dataAtual, [0, 1, 2, 3, 4, 5, 6]): null}
      {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
      {exibirPaperAtualizarStatus && idPaperAtualizarStatus && (<PaperAtualizarStatus id={idPaperAtualizarStatus} fecharPaperAtualizarStatus={fecharPaperAtualizarStatus} />)}
    </div>
  );
}

export default Blocos;
