

export function price_eurMWh_to_sntKWh(price: number): number {
    return price/10;
}

export function addVAT(price: number): number{
    return 1.255*price;
}

export function convertToFixedISOString(date: Date | undefined): string {
    if (!date) return "";
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString();
}