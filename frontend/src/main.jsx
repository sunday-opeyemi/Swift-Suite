import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import DashboardContext from './context/Dashboard.jsx'

import { Provider } from 'react-redux'
import { store } from './redux/store.js'





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <DashboardContext>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </DashboardContext>
    </NextUIProvider>
  </React.StrictMode>,
)
