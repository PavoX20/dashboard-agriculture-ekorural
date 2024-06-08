export interface DailyData {
    date: string;
    humidity: number;
    temperature: number;
    co2: number;
    ventilatorStatus: boolean;
  }
  
  export interface GeneralData {
    timestamp: number;
    date: string;
    time: string;
    humidity?: number;
    temperature?: number;
    co2?: number;
  }
  