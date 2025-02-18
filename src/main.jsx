import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChatProvider } from './context/ChatProvider.jsx'

createRoot(document.getElementById('root')).render(
  <ChatProvider>
    <App />
  </ChatProvider>,
)
