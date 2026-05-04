import { type ChangeEvent } from 'react';

export interface Option {
  value: string;
  label: string;
}

export function DropdownSelect({ options, label, onSelect, value }: 
    {options: Option[], label: string, onSelect: (value: string) => void, value: string}) {

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      onSelect(event.target.value);
    };

    return (
      <div>
        <label>
          Select {label}:
        </label>

        <select 
          value={value} 
          onChange={handleChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
}