//import { useState } from 'react'
import './App.css'

import { get_spot_prices } from './utils/api';

function App() {
  const get_price_chart =  async function() {
    console.log((await get_spot_prices()));
  }

  return (
    <div>
      <p>moi</p>
      <button
      onClick={() => {get_price_chart();}}>
        moi
      </button>
    </div>
  )
}

export default App
