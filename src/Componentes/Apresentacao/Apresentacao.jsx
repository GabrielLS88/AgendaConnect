import { useState } from 'react'
import './Apresentacao.css'





function Apresentacao({Logo}) {

  return (
   <div className='bodyApresentacao'>
    <div className="blocoApresentacao">
      <h1 id='tituloApresentacao'>Sobre Nossa Gestão</h1>
      <div className="imagenUsuarioApresentacao">
          <img id='imgLogoAvatarApresentacao' src={Logo} alt="" />
      </div>
      <p id='textoApresentacao'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ipsum voluptatum voluptate esse! Quam sed quos et odio architecto nobis! Dolorem a totam assumenda eos, corporis velit quod vel rem!</p>
      <h3>@Desenvolvedora</h3>
    </div>
      
   </div>
  )
}

export default Apresentacao
