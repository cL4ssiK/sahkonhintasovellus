import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';
import type { PeriodicSpotPrice } from '../utils/api';


interface PriceDataContextType {
  priceData: PeriodicSpotPrice[];
  setPriceData: Dispatch<SetStateAction<PeriodicSpotPrice[]>>;
  error: string;
  setError:  Dispatch<SetStateAction<string>>;
}

export const PriceDataContext = createContext<PriceDataContextType | null>(null);

export const usePriceDataContext = function() {
    const context = useContext(PriceDataContext);
    if (!context) throw new Error("usePriceData must be used within PriceDataProvider");
    return context;
};
