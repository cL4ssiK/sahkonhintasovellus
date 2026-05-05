

export interface MarketPrices {
    marketPrices: {
        periodicSpotPrices: PeriodicSpotPrice[];
    };
}

export interface PeriodicSpotPrice {
  period: Period;                   // Jakson tiedot
  meanPriceWithoutVat: number;       // Keskihinta (ilman ALV)
  minPriceWithoutVat: number;        // Minimihinta (ilman ALV)
  maxPriceWithoutVat: number;        // Maksimihinta (ilman ALV)
  unit: string;                     // Yksikkö (yleensä "EUR/MWh")
}

interface Period {
  start: string;                    // Jakson alku (ISO 8601)
  end: string;                      // Jakson loppu (ISO 8601)
  type: string;                     // Tyyppi: "pt15m", "hour", "day", "week", "month"
  identifier: string;               // Tunniste, esim. "2024-01", "2024-W01"
  complete: boolean;                // Onko jakso täydellinen/valmis
  length: PeriodLength;             // Jakson pituus
}

interface PeriodLength {
  days: number;                        // Päivien määrä
  hours: number;                       // Tuntien määrä
}

/**
 * Fetch electricity spot prices.
 * @param area areacode (ISO 3166-1 alpha-2)
 * @param start start datetime (ISO 8601)
 * @param end end datetime (ISO 8601)
 * @param resolution interval length ("pt15m", "hour", "day", "week", "month")
 * @returns 
 */
export async function get_spot_prices(area: string, start: string, end: string, resolution: string): 
  Promise<MarketPrices | null>{
    const query = `query spot_price_chart_SpotPricePeriodicQuery(
      $tenantId: ID!
      $deliveryArea: String!
      $start: String!
      $end: String!
      $resolution: String!
    ) {
      marketPrices {
        periodicSpotPrices(
          tenantId: $tenantId
          deliveryArea: $deliveryArea
          start: $start
          end: $end
          resolution: $resolution
        ) {
          maxPriceWithoutVat
          meanPriceWithoutVat
          minPriceWithoutVat
          period {
            complete
            end
            identifier
            length {
              days
              hours
            }
            start
            type
          }
          unit
        }
      }
    }`;

    const response = await fetch('https://graphql.staging.akamon.cloud/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables: { 
                tenantId:"AKAMON", 
                deliveryArea: area, 
                start: start, 
                end: end, 
                resolution: resolution 
            },
        }),
    });

  const { data, errors } = await response.json();

  if (errors) {
    return null;
  }

  return data as MarketPrices;
}