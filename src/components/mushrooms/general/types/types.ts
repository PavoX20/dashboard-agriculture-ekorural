// src/types/types.ts

export interface GeneralData {
  timestamp: string;
  humidity: number;
  temperature?: number;
  co2?: number;
}

export type HumidityChartProps = {
  data: GeneralData[];
  theme: boolean;
  threshold: number;
};

export interface TemperatureChartProps {
  data: GeneralData[];
  theme: boolean;
  threshold: number; // Agrega el umbral para temperatura
}

export type CO2ChartProps = {
  data: GeneralData[];
  theme: boolean;
  threshold: number;
};

export interface DataPoint {
  timestamp: string;
  temperature?: number;
}

export interface CombinedChartProps {
  data: GeneralData[];
  theme: boolean;
  tempThreshold: number;
  humidityThreshold: number;
  co2Threshold: number;
  title: string;
}

export interface Thresholds {
  hongoTemp: number;
  hongoHumidity: number;
  hongoCO2: number;
  inv1Temp: number;
  inv1Humidity: number;
  inv2Temp: number;
  inv2Humidity: number;
}

export type DashboardProps = {
  theme: boolean;
  thresholds: Thresholds; // Incluye los umbrales como parte de las propiedades
};

export type DataTableProps = {
  data: GeneralData[];
  theme: boolean;
};
