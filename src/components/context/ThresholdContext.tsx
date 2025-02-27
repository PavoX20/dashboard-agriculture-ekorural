import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Thresholds, ThresholdContextType } from "../types/sharedTypes";

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

export const ThresholdProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [thresholds, setThresholds] = useState<Thresholds>(() => {
    const savedThresholds = localStorage.getItem("thresholds");
    return savedThresholds
      ? JSON.parse(savedThresholds)
      : {
          hongoTemp: 20,
          hongoHumidity: 20,
          hongoCO2: 390,
          inv1Temp: 20,
          inv1Humidity: 20,
          inv2Temp: 20,
          inv2Humidity: 20,
          inv3Temp: 20,
          inv3Humidity: 20,
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
