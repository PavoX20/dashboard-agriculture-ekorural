// src/types/types.ts

import { Checkbox } from "antd";
import type { GetProp } from "antd";

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
  
  
  export type SidebarProps = {
    Dashboard: React.FC<DashboardProps>;
  };
  
  
  export interface ThresholdContextType {
    thresholds: Thresholds;
    setThresholds: (thresholds: Thresholds) => void;
  }


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

export interface CombinedChartPropsWithCO2 extends CombinedChartProps {
  co2Threshold: number;
}


export interface Thresholds {
  inv1Temp: number;
  inv1Humidity: number;
  inv2Temp: number;
  inv2Humidity: number;
  inv3Temp: number;
  inv3Humidity: number;
}

// src/types/types.ts

export interface GeneralData {
  timestamp: string;
  humidity: number;
  temperature?: number;
  co2?: number;
}

export interface TemperatureChartProps {
  data: GeneralData[];
  theme: boolean;
  threshold: number; // Agrega el umbral para temperatura
}



export interface DataPoint {
  timestamp: string;
  temperature?: number;
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

export interface DailyData {
  date: string;
  humidity: number;
  temperature: number;
  co2: number;
  ventilatorStatus: boolean;
}

export interface GeneralData {
  timestamp: string;
  date: string;
  time: string;
  humidity: number;
  temperature?: number;
  co2?: number;
}

export type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];
