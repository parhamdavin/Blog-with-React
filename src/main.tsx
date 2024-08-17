import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import 'bootstrap/dist/css/bootstrap.rtl.min.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider dir='rtl'>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
