import { useState, useEffect } from 'react';
import Header from '../../Componentes/HeaderOriginalAtual/Header';
import BlocosSemanal from '../../Componentes/BlocosSemanal/BlocoSemanal';
//import Progress from '../../Componentes/Progress/App';
import './Home.css';
import Alerta from '../../Componentes/Alerta/Alerta';

function Home() {
  const [data, setData] = useState(0);
  const [mensagemAlerta, setMensagemAlerta] = useState('');
  const [exibirAlerta, setExibirAlerta] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("tokenParaReq");
      const urlParaApi = localStorage.getItem("urlPlanilha");
      const url = urlParaApi;
      const action = 'ReadValorMensal';
      const token_acess = token;

      const apiUrl = `${url}?action=${action}&token_acess=${token_acess}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.status}`);
        }
        const jsonData = await response.json();
        
        let valor = 0;
        for (let i = 0; i < jsonData.length; i++) {
          if (jsonData[i] !== '') {
            let valorConvertido = parseFloat(jsonData[i]);
            if (!isNaN(valorConvertido)) {
              valor += valorConvertido;
            }
          }
        }
        setData(valor);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

  const fecharAlerta = () => {
    setExibirAlerta(false);
    setMensagemAlerta('');
    window.location.href = "/home";
  };

  const funcaoAtualizarLead = async () => {
    const valor = document.getElementById("inputValorConverterLead").value;
    const pagamento = document.getElementById("opcoesPagamentoConverterLead").value;
    const id = document.getElementById("inputIdLead").value;
    const token = localStorage.getItem("tokenParaReq");
    const urlParaApi = localStorage.getItem("urlPlanilha");

    try {
      const response = await fetch(`${urlParaApi}?token_acess=${token}&action=Update&id=${id}&valor=${valor}&pagamento=${pagamento}`, {
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

  const funcaoExcluirLead = async () => {
    const id = document.getElementById("inputIdLeadExclusao").value;
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



  return (
    <div className='bodyHome'>
     {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
      <div className="blocoTeste">
      <div className="blocoUpdateLead">
          <div className="subBlocoUpdate">
            <p>Atualizar valores do agendamento</p>
            <div className="localInputs">
              <input type="text" id="inputValorConverterLead" placeholder='Valor' />
              <select id="opcoesPagamentoConverterLead">
                <option value="">Forma de pagamento</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
                <option value="Débito">Débito</option>
                <option value="Crédito">Crédito</option>
                <option value="Fiado">Fiado</option>
              </select>
              <input type="text" id="inputIdLead" placeholder='Qual o id da lead?' />
              <button id='btnAtualizarLead' onClick={funcaoAtualizarLead}>Atualizar</button>
            </div>
          </div>
        </div>
        <div className="blocoDeleteLead">
          <div className="subBlocoDeletLead">
            <p>Excluir agendamento</p>
            <div className="blocoDosInput">
              <input type="text" id="inputIdLeadExclusao" placeholder='Qual o id da lead?' />
              <button id='btnExcluirLead' onClick={funcaoExcluirLead}>Excluir</button>
            </div>
          </div>
        </div>
        <div className="blocosemanais">
          <BlocosSemanal />  
        </div>
        {/* <div className="blocoValorMensal">
          <div className="subBlocoValorMensal">
            <p>O valor das vendas mensais está no total de: R${data.toFixed(2)}</p>
          </div>
        </div> */}
        {/* <div className="blocoProgresso">
          <Progress />
        </div> */}
      </div>
      
      <Header />
    </div>
  );
}

export default Home;
