import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from "@radix-ui/themes";
import './index.css'
import App from './App.jsx'
import "./fonts.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme accentColor="amber">
      <App />
    </Theme>
  </StrictMode>,
)
