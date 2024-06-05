import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Thresholds } from "./types/types";

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
    inv3Temp: 0,
    inv3Humidity: 0,
  },
  setThresholds: () => {},
});

export const ThresholdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [thresholds, setThresholds] = useState<Thresholds>(() => {
    const savedThresholds = localStorage.getItem("thresholds");
    return savedThresholds ? JSON.parse(savedThresholds) : {
      hongoTemp: 23,
      hongoHumidity: 23,
      hongoCO2: 425,
      inv1Temp: 23,
      inv1Humidity: 23,
      inv2Temp: 23,
      inv2Humidity: 23,
      inv3Temp: 23,
      inv3Humidity: 23,
    };
  });

  useEffect(() => {
    localStorage.setItem("thresholds", JSON.stringify(thresholds));
  }, [thresholds]);

  return (
    <ThresholdContext.Provider value={{ thresholds, setThresholds }}>
      {children}
    </ThresholdContext.Provider>
  );
};
