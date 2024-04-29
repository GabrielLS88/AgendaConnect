import React, { useState } from 'react';
import './Alerta.css';

function Alerta({mensagem, fecharAlerta }) {
  return (
    <div className='bodyAlerta'>
      <div className="blocoAlerta">
        <div className="blocoMensagemDoAlerta">
          <p className="mensagemAlerta">{mensagem}</p>
        </div>
        <div className="blocoBlocoBtnClose">
          <button onClick={fecharAlerta} id='btnClose'><i className="bi bi-x-lg"></i></button>
        </div>
      </div>
    </div>
  );
}

export default Alerta;
