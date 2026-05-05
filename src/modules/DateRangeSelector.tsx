import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export function DateRangeSelector({ range, setRange }: 
    {range: DateRange | undefined, setRange: (r:DateRange | undefined) => void}) {

  return (
    <div>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        footer={
          <div>
            {range?.from ? (
              !range.to ? (
                <p>Select the end date.</p>
              ) : (
                <p>
                  Range: <b>{range.from.toLocaleDateString()}</b> –{" "}
                  <b>{range.to.toLocaleDateString()}</b>
                </p>
              )
            ) : (
              <p>Pick the first day.</p>
            )}
          </div>
        }
      />
    </div>
  );
}