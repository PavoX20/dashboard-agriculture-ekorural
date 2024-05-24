export interface DataPoint {
    timestamp: string;
    humidity: number;
    temperature: number;
    co2: number;
  }
  
  export interface DailyData {
    date: string;
    data: DataPoint[];
  }
  

export const data: DailyData[] = [
    {
      "date": "2024-04-29",
      "data": [
        {"timestamp": "2024-04-29T09:00:00.000-05:00", "humidity": 45, "temperature": 21, "co2": 390},
        {"timestamp": "2024-04-29T09:20:00.000-05:00", "humidity": 45, "temperature": 21, "co2": 391},
        {"timestamp": "2024-04-29T09:40:00.000-05:00", "humidity": 45, "temperature": 21, "co2": 392},
        {"timestamp": "2024-04-29T10:00:00.000-05:00", "humidity": 46, "temperature": 22, "co2": 393},
        {"timestamp": "2024-04-29T10:20:00.000-05:00", "humidity": 46, "temperature": 22, "co2": 394},
        {"timestamp": "2024-04-29T10:40:00.000-05:00", "humidity": 46, "temperature": 22, "co2": 395},
        {"timestamp": "2024-04-29T11:00:00.000-05:00", "humidity": 47, "temperature": 23, "co2": 396},
        {"timestamp": "2024-04-29T11:20:00.000-05:00", "humidity": 47, "temperature": 23, "co2": 397},
        {"timestamp": "2024-04-29T11:40:00.000-05:00", "humidity": 47, "temperature": 23, "co2": 398},
        {"timestamp": "2024-04-29T12:00:00.000-05:00", "humidity": 48, "temperature": 24, "co2": 399},
        {"timestamp": "2024-04-29T12:20:00.000-05:00", "humidity": 48, "temperature": 24, "co2": 400},
        {"timestamp": "2024-04-29T12:40:00.000-05:00", "humidity": 48, "temperature": 24, "co2": 401},
        {"timestamp": "2024-04-29T13:00:00.000-05:00", "humidity": 49, "temperature": 25, "co2": 402},
        {"timestamp": "2024-04-29T13:20:00.000-05:00", "humidity": 49, "temperature": 25, "co2": 403},
        {"timestamp": "2024-04-29T13:40:00.000-05:00", "humidity": 49, "temperature": 25, "co2": 404},
        {"timestamp": "2024-04-29T14:00:00.000-05:00", "humidity": 50, "temperature": 26, "co2": 405},
        {"timestamp": "2024-04-29T14:20:00.000-05:00", "humidity": 50, "temperature": 26, "co2": 406},
        {"timestamp": "2024-04-29T14:40:00.000-05:00", "humidity": 50, "temperature": 26, "co2": 407},
        {"timestamp": "2024-04-29T15:00:00.000-05:00", "humidity": 51, "temperature": 27, "co2": 408},
        {"timestamp": "2024-04-29T15:20:00.000-05:00", "humidity": 51, "temperature": 27, "co2": 409},
        {"timestamp": "2024-04-29T15:40:00.000-05:00", "humidity": 51, "temperature": 27, "co2": 410}
      ]
    },
    {
      "date": "2024-04-30",
      "data": [
        {"timestamp": "2024-04-30T09:00:00.000-05:00", "humidity": 46, "temperature": 22, "co2": 395},
        {"timestamp": "2024-04-30T09:20:00.000-05:00", "humidity": 46, "temperature": 22, "co2": 396},
        {"timestamp": "2024-04-30T09:40:00.000-05:00", "humidity": 46, "temperature": 22, "co2": 397},
        {"timestamp": "2024-04-30T10:00:00.000-05:00", "humidity": 47, "temperature": 23, "co2": 398},
        {"timestamp": "2024-04-30T10:20:00.000-05:00", "humidity": 47, "temperature": 23, "co2": 399},
        {"timestamp": "2024-04-30T10:40:00.000-05:00", "humidity": 47, "temperature": 23, "co2": 400},
        {"timestamp": "2024-04-30T11:00:00.000-05:00", "humidity": 48, "temperature": 24, "co2": 401},
        {"timestamp": "2024-04-30T11:20:00.000-05:00", "humidity": 48, "temperature": 24, "co2": 402},
        {"timestamp": "2024-04-30T11:40:00.000-05:00", "humidity": 48, "temperature": 24, "co2": 403},
        {"timestamp": "2024-04-30T12:00:00.000-05:00", "humidity": 49, "temperature": 25, "co2": 404},
        {"timestamp": "2024-04-30T12:20:00.000-05:00", "humidity": 49, "temperature": 25, "co2": 405},
        {"timestamp": "2024-04-30T12:40:00.000-05:00", "humidity": 49, "temperature": 25, "co2": 406},
        {"timestamp": "2024-04-30T13:00:00.000-05:00", "humidity": 50, "temperature": 26, "co2": 407},
        {"timestamp": "2024-04-30T13:20:00.000-05:00", "humidity": 50, "temperature": 26, "co2": 408},
        {"timestamp": "2024-04-30T13:40:00.000-05:00", "humidity": 50, "temperature": 26, "co2": 409},
        {"timestamp": "2024-04-30T14:00:00.000-05:00", "humidity": 51, "temperature": 27, "co2": 410},
        {"timestamp": "2024-04-30T14:20:00.000-05:00", "humidity": 51, "temperature": 27, "co2": 411},
        {"timestamp": "2024-04-30T14:40:00.000-05:00", "humidity": 51, "temperature": 27, "co2": 412},
        {"timestamp": "2024-04-30T15:00:00.000-05:00", "humidity": 52, "temperature": 28, "co2": 413},
        {"timestamp": "2024-04-30T15:20:00.000-05:00", "humidity": 52, "temperature": 28, "co2": 414},
        {"timestamp": "2024-04-30T15:40:00.000-05:00", "humidity": 52, "temperature": 28, "co2": 415}
      ]
    }
  ]