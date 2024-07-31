import { useEffect, useState } from 'react';
import './BlocoSemanal.css';
import Alerta from '../../Componentes/Alerta/Alerta'
import PaperAtualizarStatus from '../../Componentes/PaperAtualizarStatus/PaperAtualizarStatus';

const Blocos = () => {
  const token = localStorage.getItem("tokenParaReq");
  const urlParaApi = localStorage.getItem("urlPlanilha");
  const url = urlParaApi;
  const action = 'Read';
  const token_acess = token;

  const apiUrl = `${url}?action=${action}&token_acess=${token_acess}`;

  const [data, setData] = useState([]);
  const [mensagemAlerta, setMensagemAlerta] = useState('');
  const [exibirAlerta, setExibirAlerta] = useState(false);
  const [idPaperAtualizarStatus, setIdPaperAtualizarStatus] = useState('');
  const [exibirPaperAtualizarStatus, setExibirPaperAtualizarStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        return null
      }
    };

    fetchData();
  }, [apiUrl]);

  const inverterDataIsoParaBr = (dataIso) => {
    if (dataIso && dataIso !== '') {
      const [ano, mes, dia] = dataIso.split('T')[0].split('-');
      return `${dia}/${mes}/${ano}`;
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

    return grupoPorData;
  };

  const obterDataAtual = () => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${ano}-${mes}-${dia}`;
  };

  const fecharAlerta = () => {
    setExibirAlerta(false);
    setMensagemAlerta('');
  };

  const fecharPaperAtualizarStatus = () => {
    setExibirPaperAtualizarStatus(false);
    setIdPaperAtualizarStatus('');
    window.location.href = "/home";
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
            <div className="nomeDataDia">{dataBr}</div>
            <div className="containerBlocoSemanal">
              {grupoPorData[dataBr].map((item, index) => (
                <div key={index} className="divBlocoSemanal">
                  <div className='espacoDosBlocos'>
                    <div className="ladoDeCima">
                      <div id="nomeCliente" className="blocoNomeSemanal">{item.nome}</div>
                      <div id="horarioInicial" className="blocoHoraInicialSemanal">
                        <div id='escritahora'>Horário das</div>
                        {item.horarioinicial ? item.horarioinicial.replace(/-/g, ':') : ''} 
                        <div id='escritahora'> ás </div>
                        {item.horariofinal ? item.horariofinal.replace(/-/g, ':') : ''}
                      </div>
                      <div className="valorDescricaoSemanal"><div id='escritaDiv'>Descrição:</div>{item.descricao}</div>
                    </div>
                    <div className="espacoButtonDeleteContato">
                      <button id='btnTrashClient' onClick={() => funcaoExcluirLead(item.id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                      <button id='btnCheckFinishClient' onClick={() => chamarPaper(item.id)}>
                        <i className="bi bi-person-check"></i>
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
      {data.length > 0 ? processarDados(grupoOrdenado, dataAtual, [0, 1, 2, 3, 4, 5, 6]) : <div className='escritaCarregando'>Carregando...</div>}
      {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
      {exibirPaperAtualizarStatus && idPaperAtualizarStatus && (<PaperAtualizarStatus id={idPaperAtualizarStatus} fecharPaperAtualizarStatus={fecharPaperAtualizarStatus} />)}
    </div>
  );
}

export default Blocos;
