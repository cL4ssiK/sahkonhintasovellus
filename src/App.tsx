import { useEffect, useState } from 'react'
import './App.css'

import { get_spot_prices } from './utils/api';
import type { PeriodicSpotPrice } from './utils/api';
import { Form } from './modules/Form';

interface PriceData {
  timestamp: string;
  price: number;
}

function App() {
  const [prices, setPrices] = useState<PriceData[]>([]);

  const get_price_chart =  async function() {
    const data = (await get_spot_prices())?.marketPrices?.periodicSpotPrices;
    console.log(data);
    setPrices(data?.map(
      (elem: PeriodicSpotPrice): PriceData => {
        return {timestamp: elem.period.start ,price: elem.meanPriceWithoutVat};
      }) || []
    );
  }

  useEffect( () => {
    const f = async function(){
      await get_price_chart();
    };
    f();
  }, []);

  return (
    <div>
      <p>moi</p>
      <Form></Form>
    </div>
  )
}

export default App
