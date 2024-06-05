// src/types/types.ts

export interface Thresholds {
    hongoTemp: number;
    hongoHumidity: number;
    hongoCO2: number;
    inv1Temp: number;
    inv1Humidity: number;
    inv2Temp: number;
    inv2Humidity: number;
    inv3Temp: number;
    inv3Humidity: number;
  }
  
  export type ThresholdContextType = {
    thresholds: Thresholds;
    setThresholds: (thresholds: Thresholds) => void;
  };
  