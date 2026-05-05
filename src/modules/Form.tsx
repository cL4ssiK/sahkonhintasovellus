import { useEffect } from 'react';
import { DropdownSelect } from './DropdownSelect';
import { DateRangeSelector } from './DateRangeSelector';
import { usePriceDataContext } from '../contexts/PriceDataContext';
import { get_spot_prices } from '../utils/api';
import { convertToFixedISOString } from '../utils/utilityFunctionis';
import styles from './Form.module.css';
import { useFormContext } from '../contexts/FormContext';


export function Form() {
    const { setPriceData, setError } = usePriceDataContext();
    const { selectedArea, setSelectedArea, selectedResolution, setSelectedResolution, range, setRange, hasChanged, setHasChanged, resolutionOptions, areaOptions } = useFormContext();

    useEffect(() => {
        //TODO: Cacheta selaimen muistiin ni ei tarvi pollaa apia kokoaja.
        if (!range?.from || !range?.to || !hasChanged) return;
        
        const f = async function(){
            const data = (await get_spot_prices(
                selectedArea,
                convertToFixedISOString(range.from), 
                convertToFixedISOString(range.to),   
                selectedResolution))?.marketPrices?.periodicSpotPrices;
            if(!data) {
                setError("Data not found!");
                return;
            };
            console.log(data);
            setError("");
            setPriceData(data);
            setHasChanged(false);
        };
        f();
    }, [selectedArea, selectedResolution, range, hasChanged, setHasChanged, setPriceData, setError]);

    return (
      <div className={styles.baseDiv}>
        <div className={styles.linerdiv}>
        <div className={styles.dropdowns}>
        <DropdownSelect 
          options={areaOptions}
          label="area"
          onSelect={setSelectedArea}
          value={selectedArea}
          ></DropdownSelect>
        <DropdownSelect 
          options={resolutionOptions}
          label="resolution"
          onSelect={setSelectedResolution}
          value={selectedResolution}
          ></DropdownSelect>
        </div>
        <DateRangeSelector
            range={range}
            setRange={setRange}
        ></DateRangeSelector>
        </div>
      </div>
    );
}