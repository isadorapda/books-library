import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NavigationBar } from './components/NavigationBar'
import { GlobalStyle } from './GlobalStyling/GlobalStyles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <NavigationBar />
      <GlobalStyle />
      <App />
    </React.StrictMode>
  </BrowserRouter>
)
