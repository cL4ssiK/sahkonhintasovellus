import { type ChangeEvent } from 'react';
import styles from './DropdownSelect.module.css';

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
      <div className={styles.base}>
        <label className={styles.label}>
          {label}:
        </label>

        <select 
          className={styles.select}
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