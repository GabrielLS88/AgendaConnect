import { useState } from 'react';
import './PaperAtualizarStatus.css';

function PaperAtualizarStatus({ id, fecharPaperAtualizarStatus }) {
  const [valor, setValor] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const funcaoAtualizarLead = async () => {
    console.log(id,valor,pagamento)
    setLoading(true);
    const token = localStorage.getItem("tokenParaReq");
    const urlParaApi = localStorage.getItem("urlPlanilha");
    try {
      const response = await fetch(`${urlParaApi}?token_acess=${token}&action=Update&id=${id}&valor=${valor}&pagamento=${pagamento}`, {
        method: 'GET',
        redirect: 'follow'
      });
      const result = await response.text();
      setResult(result);
      setLoading(false);
      if(result === "Atualizado com sucesso") {
        window.location.href = "/home";
      }
    } catch (error) {
      setResult('Erro ao atualizar. Por favor, tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className='bodyPaperAtualizarStatus'>
      <div className="blocoPaperAtualizarStatus">
        <div className="blocoUpdateLead">
          <div className="subBlocoUpdate">
              <p style={{fontWeight:"bold"}}>Encerramento do Atendimento</p>
            <div className="localInputs">
              <p style={{fontSize:"1rem",margin:"0rem 0rem 0.2rem"}}>Valor do serviço</p>
              <input
                type="text"
                id="inputValorConverterLead"
                placeholder='R$0,00'
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
              <p style={{fontSize:"1rem",margin:"0rem 0rem 0.2rem"}}>Forma de pagamento</p>
              <select
                id="opcoesPagamentoConverterLead"
                value={pagamento}
                onChange={(e) => setPagamento(e.target.value)}
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
                <option value="Débito">Débito</option>
                <option value="Crédito">Crédito</option>
                <option value="Fiado">Fiado</option>
              </select>
            </div>
            {loading && <div className='escritaCarregando'>Atualizando...</div>}
            {result && <div className='escritaCarregando'><p style={{color:"#00BF63"}}>{result}</p></div>}
          </div>
        </div>
        <div className="espacoButonsPaper">
          <button
            id='btnAtualizarLead'
            onClick={funcaoAtualizarLead}
            disabled={loading}
            className={`btn ${loading ? 'btn-disabled' : 'btn-active'}`}
          >
            {loading ? 'Atualizando...' : 'Atualizar'}
          </button>
          <button
            onClick={fecharPaperAtualizarStatus}
            id='btnClosePaper'
            className={`btn ${loading ? 'btn-disabled' : 'btn-active'}`}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaperAtualizarStatus;
