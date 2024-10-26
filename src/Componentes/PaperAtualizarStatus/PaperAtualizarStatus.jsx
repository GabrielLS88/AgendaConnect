import { useState } from 'react';
import './PaperAtualizarStatus.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function PaperAtualizarStatus({ id, fecharPaperAtualizarStatus, nomeCliente }) {
  const [valor, setValor] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const funcaoAtualizarLead = async () => {
    console.log(id, valor, pagamento);
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
      if (result === "Finalizado com sucesso") {
        window.location.href = "/home";
      }
    } catch (error) {
      setResult('Erro ao atualizar. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const funcaoExcluirLead = async () => {
    const token = localStorage.getItem("tokenParaReq");
    const urlParaApi = localStorage.getItem("urlPlanilha");
    setLoading(true);

    try {
      const response = await fetch(`${urlParaApi}?token_acess=${token}&action=Delete&id=${id}`, {
        method: 'GET',
        redirect: 'follow'
      });
      const result = await response.text();
      setResult('Horario excluido com sucesso');
      setTimeout(() => {
        window.location.href = "/home";
      }, 3000);
    } catch (error) {
      setResult('Erro ao excluir. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bodyPaperAtualizarStatus'>
      <div className="blocoPaperAtualizarStatus">
        <div className="blocoUpdateLead">
          <div className="subBlocoUpdate">
            <p style={{ fontWeight: "bold" }}>Ficha do Atendimento de <span style={{ color: '#00BF63' }}>{nomeCliente}</span></p>
            <div className="localInputs">
              <div className="espacoParaInput">
                <p style={{ fontSize: "1rem", margin: "0rem 0rem 0.2rem", fontStyle: 'bold' }}>Valor</p>
                <input
                  type="number"
                  id="inputValorConverterLead"
                  placeholder='0'
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>
              <div className="espacoParaInput">
                <p style={{ fontSize: "1rem", margin: "0rem 0rem 0.2rem" }}>Forma de pagamento</p>
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
            </div>
            {loading && <div className='escritaCarregando'>Atualizando...</div>}
            {result && <div className='escritaCarregando'><p style={{ color: "#00BF63" }}>{result}</p></div>}
          </div>
        </div>
        <div className="espacoButonsPaper">

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip style={{ width: '130px', height: 'auto', zIndex:'9999999'}} id="button-tooltip">Excluir agendamento</Tooltip>}
          >
            <button id='btnTrashClient' onClick={funcaoExcluirLead}>
              Excluir
            </button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip style={{ width: '130px', height: 'auto', zIndex:'9999999'}} id="button-tooltip">Fechar menu</Tooltip>}
          >
            <button
            onClick={fecharPaperAtualizarStatus}
            id='btnClosePaper'
            className={`btn ${loading ? 'btn-disabled' : 'btn-active'}`}
            disabled={loading}
          >
            Cancelar
          </button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip style={{ width: '130px', height: 'auto', zIndex:'9999999'}} id="button-tooltip">Realizar finalizamento</Tooltip>}
          >
            <button
            id='btnAtualizarLead'
            onClick={funcaoAtualizarLead}
            disabled={loading}
            className={`btn ${loading ? 'btn-disabled' : 'btn-active'}`}
          >
            {loading ? 'Finalizando...' : 'Finalizar'}
          </button>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
}

export default PaperAtualizarStatus;
