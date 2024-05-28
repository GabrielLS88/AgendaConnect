import React from 'react'
import ReactDOM from 'react-dom/client'
import './StyleGlobal/index.css'
import { BrowserRouter , HashRouter} from 'react-router-dom'
import MainRoutes from './routes'


ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
  <MainRoutes />
  </HashRouter>
)
