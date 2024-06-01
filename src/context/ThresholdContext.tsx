import React, { createContext, useState, ReactNode } from "react";
import { Thresholds } from "../components/settings/types/types";

type ThresholdContextType = {
  thresholds: Thresholds;
  setThresholds: (thresholds: Thresholds) => void;
};

export const ThresholdContext = createContext<ThresholdContextType>({
  thresholds: {
    hongoTemp: 0,
    hongoHumidity: 0,
    hongoCO2: 0,
    inv1Temp: 0,
    inv1Humidity: 0,
    inv2Temp: 0,
    inv2Humidity: 0,
  },
  setThresholds: () => {},
});

export const ThresholdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [thresholds, setThresholds] = useState<Thresholds>({
    hongoTemp: 25,
    hongoHumidity: 70,
    hongoCO2: 1000,
    inv1Temp: 28,
    inv1Humidity: 60,
    inv2Temp: 26,
    inv2Humidity: 65,
  });

  return (
    <ThresholdContext.Provider value={{ thresholds, setThresholds }}>
      {children}
    </ThresholdContext.Provider>
  );
};
