import React, { useState, useEffect } from 'react';
import Header from '../../Componentes/HeaderOriginalAtual/Header';
import BlocosSemanal from '../../Componentes/BlocosSemanal/BlocoSemanal';
import Progress from '../../Componentes/Progress/App';
import './Home.css';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = 'https://script.google.com/macros/s/AKfycbzAYHD26zk69fnnfLq0tuV3259-6fcZ_vlB8ET0PVPr6Z7d3vzFTRyNg16C89CNVGblUQ/exec';
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
        <div className="blocoProgresso">
          <Progress />
        </div>
      </div>
      <Header />
    </div>
  );
}

export default Home;
