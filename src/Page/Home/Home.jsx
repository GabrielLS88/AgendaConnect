import React, { useState, useEffect } from 'react';
import Header from '../../Componentes/HeaderOriginalAtual/Header';
import BlocosSemanal from '../../Componentes/BlocosSemanal/BlocoSemanal';
import Progress from '../../Componentes/Progress/App';
import './Home.css';
import Alerta from '../../Componentes/Alerta/Alerta';

function Home() {
  const [data, setData] = useState(0);
  const [mensagemAlerta, setMensagemAlerta] = useState('');
  const [exibirAlerta, setExibirAlerta] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const url = 'https://script.google.com/macros/s/AKfycbx0HQFKL7SVoqnnt6StJXKFctMCvMpA-1Ef7iw__LHQp2nfshGdBfGWYSplVYLkbneOpw/exec';
      const action = 'ReadValorMensal';
      const token_acess = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

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

    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycbwl4nmv4E4AqS9Awqu0cnJINHqKHEieOHc0oBH20R1HOFxU_KCXCwpGu4MtKBxkw7A4Hw/exec?token_acess=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c&action=Update&id=${id}&valor=${valor}&pagamento=${pagamento}`, {
        method: 'GET',
        redirect: 'follow'
      });
      const result = await response.text();
      setMensagemAlerta(result);
      setExibirAlerta(true);
    } catch (error) {
      setMensagemAlerta(result);
      setExibirAlerta(true);
    }
  };

  const funcaoExcluirLead = async () => {
    const id = document.getElementById("inputIdLeadExclusao").value;

    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycbzJcfjNwGFVrMnIAdIH41Z9RwPpu2zwJ_KiymPm0KmE_hZ0DKU9VfXYi9hLBWK0gbi8Tw/exec?token_acess=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c&action=Delete&id=${id}`, {
        method: 'GET',
        redirect: 'follow'
      });
      const result = await response.text();
      setMensagemAlerta(result);
      setExibirAlerta(true);
    } catch (error) {
      setMensagemAlerta(result);
      setExibirAlerta(true);
    }
  };



  return (
    <div className='bodyHome'>
     {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
      <div className="blocoTeste">
        <div className="blocosemanais">
          <BlocosSemanal />  
        </div>
        <div className="blocoValorMensal">
          <div className="subBlocoValorMensal">
            <p>O valor das vendas mensais está no total de: R${data.toFixed(2)}</p>
          </div>
        </div>
        <div className="blocoUpdateLead">
          <div className="subBlocoUpdate">
            <p>Atualizar valores da Lead</p>
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
            <p>Excluir Lead</p>
            <div className="blocoDosInput">
              <input type="text" id="inputIdLeadExclusao" placeholder='Qual o id da lead?' />
              <button id='btnExcluirLead' onClick={funcaoExcluirLead}>Excluir</button>
            </div>
          </div>
        </div>
        {/* <div className="blocoProgresso">
          <Progress />
        </div> */}
      </div>
      
      <Header />
    </div>
  );
}

export default Home;
