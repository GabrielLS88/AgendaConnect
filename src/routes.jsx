import SingIn from "./Page/SingIn/SingIn";
import SingUp from "./Page/SingUp/SingUp";
import Home from "./Page/Home/Home";
import { PrivateRoute } from "./Componentes/PrivateRote/PrivateRote";
import React, { useState, useEffect } from "react";
import {Routes, Route } from "react-router-dom";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SingIn />} />
      <Route path="/singup" element={<SingUp />} />
      <Route path="/home" element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;