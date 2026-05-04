import { useEffect, useState } from 'react';
import { DropdownSelect, type Option } from './DropdownSelect';

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
    const [selectedArea, setSelectedArea] = useState<string>(areaOptions[0].value);
    const [selectedResolution, setSelectedResolution] = useState<string>(resolutionOptions[0].value);

    useEffect(() => {
        //Aina kun vaihtuu, nii päivittää.
        console.log(selectedArea);
        console.log(selectedResolution);
    }, [selectedArea, selectedResolution]);

    //TODO: Lisää aikavälin valinta
    return (
      <div>
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
    );
}