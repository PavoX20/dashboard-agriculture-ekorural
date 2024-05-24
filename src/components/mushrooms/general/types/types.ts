// types.ts
export interface GeneralData {
  timestamp: string; // Representa la marca de tiempo del dato
  humidity: number; // Valor numérico de la humedad
  temperature?: number; // Valor opcional de temperatura, si decides incluirlo más tarde
  co2?: number; // Valor opcional de CO2, si decides incluirlo más tarde
}

export type HumidityChartProps = {
  data: GeneralData[];
  theme: boolean;
};

export interface TemperatureChartProps {
  data: GeneralData[];
  theme: boolean;
}

export type CO2ChartProps = {
  data: GeneralData[];
  theme: boolean;
  threshold: number;
};

// CO2Data.ts

type CO2DataPoint = {
  timestamp: string;
  co2: number;
};

// Tipo para los datos de un día completo
export interface DayCO2Data {
  date: string; // Fecha del día al que corresponden los datos
  data: CO2DataPoint[]; // Array de puntos de datos de CO2 para ese día
}



// Definiciones adicionales para asegurar la compatibilidad con otros componentes
export interface DataPoint {
  timestamp: string;
  temperature?: number;
}

