import { useEffect, useState, type ReactNode } from 'react';
import { FormContext } from './FormContext';
import { type Option } from '../modules/DropdownSelect';
import { type DateRange } from 'react-day-picker';




export const FormProvider = ({ children }: { children: ReactNode }) => {
    
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
    
    const [selectedArea, setSelectedArea] = useState<string>(areaOptions[0].value);
    const [selectedResolution, setSelectedResolution] = useState<string>(resolutionOptions[0].value);
    const [range, setRange] = useState<DateRange | undefined>();
    const [hasChanged, setHasChanged] = useState<boolean>(false);

    useEffect(() => {
        const f = function(){
            setHasChanged(true);
        }
        f();
    }, [selectedArea, selectedResolution, range]);

    return (
        <FormContext.Provider value={{ selectedArea, setSelectedArea, selectedResolution, setSelectedResolution, range, setRange, hasChanged, setHasChanged, resolutionOptions, areaOptions }}>
            {children}
        </FormContext.Provider>
  );
};
