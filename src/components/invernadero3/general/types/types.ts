// types.ts
export interface GeneralData {
  timestamp: string; // Representa la marca de tiempo del dato
  humidity: number; // Valor numérico de la humedad
  temperature?: number; // Valor opcional de temperatura, si decides incluirlo más tarde
  co2?: number; // Valor opcional de CO2, si decides incluirlo más tarde
}

export interface WeeklyData {
  date: string; // Representa la marca de tiempo del dato
  data: GeneralData[]; // Valor numérico de la humedad
}

export interface HumidityChartProps {
  data: GeneralData[];
}

export interface TemperatureChartProps {
  data: GeneralData[];
}

export interface CO2ChartProps {
  data: GeneralData[];
}

// CO2Data.ts

// Tipo para un punto de datos individual de CO2
export interface CO2DataPoint {
  timestamp: string; // Fecha y hora del registro, en formato ISO
  co2: number; // Nivel de CO2 medido en ese momento
  // Puedes añadir aquí otros datos si es necesario, como temperatura y humedad
}

// Tipo para los datos de un día completo
export interface DayCO2Data {
  date: string; // Fecha del día al que corresponden los datos
  data: CO2DataPoint[]; // Array de puntos de datos de CO2 para ese día
}

// Props para el componente WeekCO2Chart
export interface CO2WeekChartProps {
  weeklyData: DayCO2Data[]; // Datos de CO2 para la semana completa
}

// Definiciones adicionales para asegurar la compatibilidad con otros componentes
export interface DataPoint {
  timestamp: string;
  temperature?: number;
}