import React, { useState } from 'react';
import './PaperAtualizarStatus.css';

function PaperAtualizarStatus({ id, fecharPaperAtualizarStatus }) {
  const [valor, setValor] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const funcaoAtualizarLead = async () => {
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
            <p>Olá, qual o valor e a forma de pagamento para Atualizar?</p>
            <div className="localInputs">
              <input
                type="text"
                id="inputValorConverterLead"
                placeholder='Valor'
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
              <select
                id="opcoesPagamentoConverterLead"
                value={pagamento}
                onChange={(e) => setPagamento(e.target.value)}
              >
                <option value="">Forma de pagamento</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
                <option value="Débito">Débito</option>
                <option value="Crédito">Crédito</option>
                <option value="Fiado">Fiado</option>
              </select>
            </div>
            {loading && <div className='escritaCarregando'>Atualizando...</div>}
            {result && <div className='escritaCarregando'>{result}</div>}
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
