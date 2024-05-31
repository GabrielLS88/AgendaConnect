import React, { useState, useEffect } from 'react';
import Header from '../../Componentes/HeaderOriginalAtual/Header';
import BlocosSemanal from '../../Componentes/BlocosSemanal/BlocoSemanal';
import Progress from '../../Componentes/Progress/App';
import './Home.css';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = 'https://script.google.com/macros/s/AKfycbxRE8ajIdxssCdXFmIqYKJnqCi4kEDSCd6ACNih3drnliPCxIYQcwVAsUlCCjwL4oBUpw/exec';
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
          let valorConverido = parseFloat(jsonData[i])
            valor = valor + valorConverido;
        }
        setData(valor);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);


  return (
    <div className='bodyHome'>
      <div className="blocoTeste">
        <div className="blocosemanais">
          <BlocosSemanal />  
        </div>
        <div className="blocoValorMensal">
          <div className="subBlocoValorMensal">
            <p>O valor das vendas mensais está no total de: R${data}</p>
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
              <option value="Débito">Débito</option>
              <option value="Crédito">Crédito</option>
              <option value="Fiado">Fiado</option>
            </select>
              <input type="text" id="inputIdLead" placeholder='Qual o id da lead?' />
              <button id='btnAtualizarLead'>Atualizar</button>
            </div>
          </div>
        </div>
        <div className="blocoProgresso">
          <Progress />
        </div>
      </div>
      <Header />
    </div>
  );
}

export default Home;
