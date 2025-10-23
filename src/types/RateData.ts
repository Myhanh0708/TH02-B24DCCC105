// src/types/RateData.ts

export interface RateData {
    base: string;
    rates: {
        [currencyCode: string]: number;
    };
    time_last_update_utc: string;
}