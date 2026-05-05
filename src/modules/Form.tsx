import { useEffect, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { DropdownSelect, type Option } from './DropdownSelect';
import { DateRangeSelector } from './DateRangeSelector';
import { usePriceDataContext } from '../contexts/PriceDataContext';
import { get_spot_prices } from '../utils/api';
import { convertToFixedISOString } from '../utils/utilityFunctionis';
import styles from './Form.module.css';

const areaOptions: Option[] = [
    { value: 'FI', label: 'Finland' },
    { value: 'SE1', label: 'Sweden (Luleå)' },
    { value: 'SE2', label: 'Sweden (Sundsvall)' },
    { value: 'SE3', label: 'Sweden (Stockholm)' },
    { value: 'SE4', label: 'Sweden (Malmö)' },
    { value: 'NO1', label: 'Norway (Oslo)' },
    { value: 'DK1', label: 'Denmark (West)' },
    { value: 'EE', label: 'Estonia' },
];

const resolutionOptions: Option[] = [
    { value: 'pt15m', label: '15 min' },
    { value: 'hour', label: 'Hour' },
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
];

export function Form() {
    const { setPriceData, setError } = usePriceDataContext();

    const [selectedArea, setSelectedArea] = useState<string>(areaOptions[0].value);
    const [selectedResolution, setSelectedResolution] = useState<string>(resolutionOptions[0].value);
    const [range, setRange] = useState<DateRange | undefined>();
    
    useEffect(() => {
        //TODO: Cacheta selaimen muistiin ni ei tarvi pollaa apia kokoaja.
        if (!range?.from || !range?.to) return;
        
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
        };
        f();
    }, [selectedArea, selectedResolution, range, setPriceData, setError]);

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