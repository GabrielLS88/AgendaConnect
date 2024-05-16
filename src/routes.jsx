import SingIn from "./Page/SingIn/SingIn";
import SingUp from "./Page/SingUp/SingUp";
import Home from "./Page/Home/Home";
import Agendamento from "./Page/Agendamento/Agendamento.jsx"
import Historico from "./Page/Historico/Historico.jsx"
import { PrivateRoute } from "./Componentes/PrivateRote/PrivateRote";
import React from "react";
import { Routes, Route } from "react-router-dom";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SingIn />} />
      <Route path="/singup" element={<SingUp />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/agenda" element={<Agendamento />} />
        <Route path="/historico" element={<Historico />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
