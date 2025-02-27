
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ShopcontextProvider from './context/ShopContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ShopcontextProvider>
    <App />
  </ShopcontextProvider>
  </BrowserRouter>,
)
