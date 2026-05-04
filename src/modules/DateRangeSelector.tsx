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
        // You can limit selection to 30 days, or prevent past dates
        //disabled={{ before: new Date() }} 
        footer={
          <div>
            {range?.from ? (
              !range.to ? (
                <p>Please select the end date.</p>
              ) : (
                <p>
                  Range: <b>{range.from.toLocaleDateString()}</b> –{" "}
                  <b>{range.to.toLocaleDateString()}</b>
                </p>
              )
            ) : (
              <p>Please pick the first day.</p>
            )}
          </div>
        }
      />
    </div>
  );
}