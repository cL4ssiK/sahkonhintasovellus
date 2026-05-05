import { parseISO, format } from "date-fns";
import { usePriceDataContext } from "../contexts/PriceDataContext";
import { price_eurMWh_to_sntKWh, addVAT } from "../utils/utilityFunctionis"; 

export function PriceTable(){
    const { priceData, error } = usePriceDataContext();

    return(
        <div>
            {
            error === "" ? (
            
            <table>
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

                        return(
                        <tr key={index}>
                            <td>{format(date, 'dd.MM.') !== formatprev ? format(date, 'dd.MM.') : ""}</td>
                            <td>{format(date, 'HH:mm')}</td>
                            <td>{
                                price_eurMWh_to_sntKWh(addVAT(elem.meanPriceWithoutVat)).toFixed(2)
                            }</td>
                        </tr>
                    )})}
                </tbody>
            </table>) : (<p>Data not available with current parameters.</p>)

            }
        </div>
    );
}