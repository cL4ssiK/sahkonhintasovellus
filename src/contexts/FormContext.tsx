import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';
import type { DateRange } from 'react-day-picker';
import type { Option } from '../modules/DropdownSelect';


interface FormContextType {
    selectedArea: string;
    setSelectedArea: Dispatch<SetStateAction<string>>;
    selectedResolution: string;
    setSelectedResolution: Dispatch<SetStateAction<string>>;
    range: DateRange | undefined;
    setRange: Dispatch<SetStateAction<DateRange | undefined>>;
    hasChanged: boolean;
    setHasChanged: Dispatch<SetStateAction<boolean>>;
    resolutionOptions: Option[];
    areaOptions: Option[];
}


export const FormContext = createContext<FormContextType | null>(null);

export const useFormContext = function() {
    const context = useContext(FormContext);
    if (!context) throw new Error("useFormContext must be used within FormProvider");
    return context;
};
