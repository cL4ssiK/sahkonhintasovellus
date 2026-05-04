

export function price_eurMWh_to_sntKWh(price: number): number {
    return price/10;
}

export function convertToFixedISOString(date: Date | undefined): string {
    if (!date) return "";
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString();
}