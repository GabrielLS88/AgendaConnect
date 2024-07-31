import { useState} from 'react';
import Header from '../../Componentes/HeaderOriginalAtual/Header';
import BlocosSemanal from '../../Componentes/BlocosSemanal/BlocoSemanal';
import './Home.css';
import Alerta from '../../Componentes/Alerta/Alerta';

function Home() {
  const [mensagemAlerta, setMensagemAlerta] = useState('');
  const [exibirAlerta, setExibirAlerta] = useState(false);

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

  



  return (
    <div className='bodyHome'>
     {exibirAlerta && <Alerta mensagem={mensagemAlerta} fecharAlerta={fecharAlerta} />}
      <Header />
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
        <div className="blocosemanais">
          <BlocosSemanal />  
        </div>
      </div>
      
      
    </div>
  );
}

export default Home;
