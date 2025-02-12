import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="838995627390-a3bajjldovsl9a32q4e5u3pvqo6k2qce.apps.googleusercontent.com">
      <App />
      <ToastContainer
      position="bottom-right"
      />
    </GoogleOAuthProvider>
  </StrictMode>,
)
