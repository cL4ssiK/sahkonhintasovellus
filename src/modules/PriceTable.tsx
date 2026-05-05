import { parseISO, format } from "date-fns";
import { usePriceDataContext } from "../contexts/PriceDataContext";
import { price_eurMWh_to_sntKWh, addVAT } from "../utils/utilityFunctionis"; 
import styles from './PriceTable.module.css';
import { useFormContext } from "../contexts/FormContext";
import { useMemo } from "react";


export function PriceTable(){
    const { priceData, error } = usePriceDataContext();
    const { selectedArea } = useFormContext();

    const avg = useMemo(() => {
        const average = priceData.reduce((a, b) => a + b.meanPriceWithoutVat, 0) / (priceData.length || 1);
        return price_eurMWh_to_sntKWh(addVAT(average, selectedArea)).toFixed(2);
    }, [priceData, selectedArea]);

    return(
        <div className={styles.base}>
            <p>PERIOD AVERAGE {avg} c/kWh</p>
            { error === "" ? (
                <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Price (c/kWh)</th>
                      </tr>
                    </thead>
                    <tbody>
                        {priceData.map((elem, index, elements) => {
                            const date = parseISO(elem.period.start);
                            const prev = index > 0 ? parseISO(elements[index - 1].period.start) : null;
                            const formatprev = prev ? format(prev, 'dd.MM.') : "";

                            return (
                                <tr key={index}>
                                    <td className={styles.date}>{format(date, 'dd.MM.') !== formatprev ? format(date, 'dd.MM.') : ""}</td>
                                    <td>{format(date, 'HH:mm')}</td>
                                    <td>{
                                        price_eurMWh_to_sntKWh(addVAT(elem.meanPriceWithoutVat, selectedArea)).toFixed(2)
                                    }</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>) : (<p>Data not available with current parameters.</p>)
            }
        </div>
    );
}