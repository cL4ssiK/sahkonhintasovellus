export interface MarketPrices {
    mp: PeriodicSpotPrice[];
}

export interface PeriodicSpotPrice {
  period: Period;                   // Jakson tiedot
  meanPriceWithoutVat: number;       // Keskihinta (ilman ALV)
  minPriceWithoutVat: number;        // Minimihinta (ilman ALV)
  maxPriceWithoutVat: number;        // Maksimihinta (ilman ALV)
  unit: string;                     // Yksikkö (yleensä "EUR/MWh")
}

export interface Period {
  start: string;                    // Jakson alku (ISO 8601)
  end: string;                      // Jakson loppu (ISO 8601)
  type: string;                     // Tyyppi: "pt15m", "hour", "day", "week", "month"
  identifier: string;               // Tunniste, esim. "2024-01", "2024-W01"
  complete: boolean;                // Onko jakso täydellinen/valmis
  length: PeriodLength;             // Jakson pituus
}

export interface PeriodLength {
  days: number;                        // Päivien määrä
  hours: number;                       // Tuntien määrä
}

export async function get_spot_prices(): Promise<MarketPrices | null>{
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
                tenantId:"cLassiK", 
                deliveryArea:"FI", 
                start:"2024-01-01T00:00:00Z", 
                end:"2024-01-31T23:59:59Z", 
                resolution:"day" 
            },
        }),
    });

  const { data, errors } = await response.json();

  if (errors) {
    console.error(errors);
    return null;
  }

  // data is now typed as UserData
  return data as MarketPrices;
}