import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import _app from "../src/pages/_app"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <_app />
  </StrictMode>,
)
