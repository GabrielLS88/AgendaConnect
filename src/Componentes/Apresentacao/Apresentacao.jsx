import { useState } from 'react'
import './Apresentacao.css'





function Apresentacao({Logo}) {

  return (
   <div className='bodyApresentacao'>
    <div className="blocoApresentacao">
      <h1 id='tituloApresentacao'>Qual a nossa missão?</h1>
      <div className="imagenUsuarioApresentacao">
          <img id='imgLogoAvatarApresentacao' src={Logo} alt="" />
      </div>
      <p id='textoApresentacao'>Estamos em busca de formas de aprimorar o sistema de microempresas, focando em suas agendas e nos serviços que oferecem. A Agenda Connect visa priorizar as demandas dos clientes e aprimorar o desempenho das empresas!</p>
      <p id='tituloInstagram'>@agenda_connect</p>
    </div>
      
   </div>
  )
}

export default Apresentacao
