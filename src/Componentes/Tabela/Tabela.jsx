import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from '../Spinner/Spinner';
import Alerta from '../../Componentes/Alerta/Alerta';

function BasicExample() {
  const token = localStorage.getItem("tokenParaReq");
  const urlParaApi = localStorage.getItem("urlPlanilha");
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
  const [mes] = useState(obterNomeMesAtual);
  const [loading, setLoading] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState('');
  const [exibirAlerta, setExibirAlerta] = useState(false);

  const fetchData = async (mes) => {
    try {
      setLoading(true);
      const apiUrl = `${urlParaApi}?action=${action}&token_acess=${token_acess}&mes=${mes}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status}`);
      }
      const jsonData = await response.json();
      console.log('Dados recebidos da API:', jsonData); // Verificar os dados recebidos
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

  const isHoje = (data) => {
    const hoje = new Date();
    const dataComparar = new Date(data);
    return (
      hoje.getDate() === dataComparar.getDate() &&
      hoje.getMonth() === dataComparar.getMonth() &&
      hoje.getFullYear() === dataComparar.getFullYear()
    );
  };

  const fecharAlerta = () => {
    setExibirAlerta(false);
    setMensagemAlerta('');
  };

  // Função para somar os valores
  const somaValores = (dados) => {
    return dados.reduce((total, item) => total + parseFloat(item.valor), 0);
  };

  // Filtrar os dados para o dia atual e para o mês atual
  const dadosDia = data.filter(item => isHoje(item.data));

  // Calcular a soma dos valores
  const valorTotalDia = somaValores(dadosDia);

  // Obter a data atual no formato desejado
  const dataAtual = new Date().toLocaleDateString('pt-BR');

  return (
    <>
      {loading && <Spinner />}
      {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Data</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td><strong>{dataAtual}</strong></td>
          <td><strong>{valorTotalDia.toFixed(2)}</strong></td>
        </tr>
        </tbody>
      </Table>
    </>
  );
}

export default BasicExample;