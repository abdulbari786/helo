import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)

document.documentElement.classList.add('app-ready')
