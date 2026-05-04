import { useState, type ReactNode } from 'react';
import type { PeriodicSpotPrice } from '../utils/api';
import { PriceDataContext } from './PriceDataContext';


export const PriceDataProvider = ({ children }: { children: ReactNode }) => {
    const [priceData, setPriceData] = useState<PeriodicSpotPrice[]>([]);
    const [error, setError] = useState<string>("");
    
    return (
        <PriceDataContext.Provider value={{ priceData, setPriceData, error, setError }}>
            {children}
        </PriceDataContext.Provider>
  );
};
