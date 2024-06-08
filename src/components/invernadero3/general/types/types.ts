export interface GeneralData {
  timestamp: string;
  humidity: number;
  temperature?: number;
}

export interface CombinedChartProps {
  data: GeneralData[];
  theme: boolean;
  tempThreshold: number;
  humidityThreshold: number;
  title: string;
}

export interface Thresholds {
  inv1Temp: number;
  inv1Humidity: number;
  inv2Temp: number;
  inv2Humidity: number;
  inv3Temp: number;
  inv3Humidity: number;
}

export type DashboardProps = {
  theme: boolean;
  thresholds: Thresholds;
};


export type DataTableProps = {
  data: GeneralData[];
  theme: boolean;
};