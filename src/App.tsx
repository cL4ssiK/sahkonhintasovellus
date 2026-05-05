import './App.css'
import { Form } from './modules/Form';
import { Header } from './modules/Header';
import { PriceTable } from './modules/PriceTable';
import { useState } from 'react';

function App() {
  const [view, setView] = useState(0);
  const views = [<Form/>, <PriceTable/>];

  return (
    <div className='appBaseDiv'>
       <div className="scanlines"></div>
      <h2>Electricity spot price viewer</h2>
      <Header setView={setView}></Header>
      {views[view]}
    </div>
  )
}

export default App
