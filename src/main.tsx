import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BlogAPIProvider } from './utils/blogAPI'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BlogAPIProvider>
      <App />
    </BlogAPIProvider>
  </React.StrictMode>,
)
