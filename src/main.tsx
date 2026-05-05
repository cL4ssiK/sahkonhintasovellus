import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './variables.css'
import App from './App.tsx'
import { PriceDataProvider } from './contexts/PriceDataProvider.tsx'
import { FormProvider } from './contexts/FormProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PriceDataProvider>
      <FormProvider>
        <App />
      </FormProvider>
    </PriceDataProvider>
  </StrictMode>,
)
