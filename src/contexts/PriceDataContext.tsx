import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';
import type { PeriodicSpotPrice } from '../utils/api';

// 1. Define the shape of your Context data
interface PriceDataContextType {
  priceData: PeriodicSpotPrice[];
  setPriceData: Dispatch<SetStateAction<PeriodicSpotPrice[]>>;
  error: string;
  setError:  Dispatch<SetStateAction<string>>;
}

// 2. Initialize with null, but tell TS the type it WILL hold
// We use 'undefined' or 'null' as the starting value
export const PriceDataContext = createContext<PriceDataContextType | null>(null);

export const usePriceDataContext = function() {
    const context = useContext(PriceDataContext);
    if (!context) throw new Error("usePriceData must be used within PriceDataProvider");
    return context;
};
