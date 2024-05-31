import React, { useEffect, useState } from 'react';
import './Blocos.css';

const Blocos = () => {
  const url = 'https://script.google.com/macros/s/AKfycbwj1lEALrPJkJr2RlDiu5ytsayDSm2tTiC1hUfxjMTz6ezmyrKWeUNA7Uf3ptmXJdN7tg/exec';
  const action = 'Read';
  const token_acess = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  const apiUrl = `${url}?action=${action}&token_acess=${token_acess}`;

  const [data, setData] = useState([]);

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
        console.error(error.message);
      }
    };

    fetchData();
  }, [apiUrl]);

  const inverterDataIsoParaBr = (dataIso) => {
    if(dataIso !== 0 && dataIso !== ''){
      const parteData = dataIso.split('T')[0];
      const [ano, mes, dia] = parteData.split('-');
      const dataBr = `${dia}/${mes}/${ano}`;
      return dataBr;
      }
  };

  const groupDataByDate = (data) => {
    const grupoPorData = {};

    for (let i = 0; i < data.length; i++) {
      const dataBr = inverterDataIsoParaBr(data[i].data);

      if (!grupoPorData[dataBr]) {
        grupoPorData[dataBr] = [];
      }

      grupoPorData[dataBr].push({
        nome: data[i].nomecliente,
        data: dataBr,
        valor: data[i].valor,
        horarioinicial: data[i].horarioinicial,
        horariofinal: data[i].horariofinal,
        descricao: data[i].descricao,
        pagamento: data[i].pagamento,
        id: data[i].id,
        status: data[i].status
      });
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
                      <div id="horarioInicial" className="blocoHoraInicial"><div id='escritahora'>Horário das</div>{item.horarioinicial ? item.horarioinicial.replace(/-/g, ':') : ''}<div id='escritahora'> ás </div>{item.horariofinal ? item.horariofinal.replace(/-/g, ':') : ''}</div>
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
  

  return (
    <div>
        <div>
          {processarDados(ordenarPorData(groupDataByDate(data)))}
        </div>
    </div>
  );
};

export default Blocos;
