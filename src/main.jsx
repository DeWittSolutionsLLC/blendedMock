import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

async function prepare() {
  // MSW runs automatically in dev unless explicitly disabled with VITE_MOCK_API=false.
  // It is never included in production builds (import.meta.env.DEV is false).
  if (import.meta.env.DEV && import.meta.env.VITE_MOCK_API !== 'false') {
    const { worker } = await import('./mocks/browser.js')
    await worker.start({
      onUnhandledRequest: 'warn',
    })
  }
}

prepare().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
