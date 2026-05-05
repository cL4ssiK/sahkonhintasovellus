

export function price_eurMWh_to_sntKWh(price: number): number {
    return price/10;
}

/**
 * Adds vat to the price. supported countries: finland, sweden, norway, denmark and estonia.
 * @param price number
 * @param country FI, SE, NO, DK, EE
 * @returns 
 */
export function addVAT(price: number, country: string): number{
    const VATs = {
        "FI": 1.255,
        "SE": 1.25,
        "NO": 1.25,
        "DK": 1.25,
        "EE": 1.24,
    };
    const vat = VATs[country as keyof typeof VATs] ?? 1.0;
    return vat*price;
}

/**
 * Convert date into ISO string withhout timezone adjustment.
 * @param date Date
 * @returns 
 */
export function convertToFixedISOString(date: Date | undefined): string {
    if (!date) return "";
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString();
}