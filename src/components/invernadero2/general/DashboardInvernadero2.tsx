import { useEffect, useState } from "react";
import "./DashboardInvernadero2.css";
import { humedityLastDay } from "./fetchData/fetchData";
import { Divider } from "antd";
import LinePlotLastDayHumedity from "./plotsLastDay/linePlotLastDayHumedity";
import { GeneralData } from "./types/types";
import LinePlotLastDayTemperature from "./plotsLastDay/linePlotLastDayTemperature";

const DashboardInvernadero1 = () => {
  const [humedity, setHumidity] = useState<number | null>(null);
  const [co2, setCo2] = useState<number | null>(null);
  
  const [time, setTime] = useState<string | null>(null);
  const [dataLastDay, setDataLastDay] = useState<GeneralData[]>([]);

  const fetchHumedityLastDay = async () => {
    try {
      const data = await humedityLastDay();
      if(data === null) return;
      setDataLastDay(data);

      // Log para verificar los datos
      console.log("Datos recibidos del backend:", data);

      // Obtener el último dato del array
      const latestData = data[data.length - 1];
      console.log("Últimos datos recibidos:", latestData);
      
      if (latestData) {
        setHumidity(latestData.humidity);
        setCo2(latestData.co2); // Asegúrate de que el campo sea correcto

        const lastUpdated = new Date(latestData.timestamp);
        const now = new Date();

        const difference = now.getTime() - lastUpdated.getTime();
        const minutesAgo = Math.floor(difference / 60000);

        setTime(minutesAgo.toString());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchHumedityLastDay();
  }, []);

  return (
    <>
      <div className="container-fluid container-body">
        <div className="row row-body">
          <div className="col-12">
            <h3>Invernadero 2</h3>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-4 col-hum-co2 flex-column">
            <p className="mushroom-text">
              Humedad actual:
              {humedity === null ? (
                <span className="mushroom-value-notLoaded">{"Cargando..."}</span>
              ) : (
                <span className="mushroom-value">{humedity}</span>
              )}
            </p>
          </div>

          <div className="col-sm-4 col-hum-co2 flex-column">
            <p className="mushroom-text">
              Temperatura actual:
              {co2 === null ? (
                <span className="mushroom-value-notLoaded">{"Cargando..."}</span>
              ) : (
                <span className="mushroom-value">{co2} &#176;C</span>
              )}
            </p>
          </div>

          
          <br />
          <p className="mushroom-value-lastUpdated">
            Datos actualizados hace {time} minuto(s)
          </p>
        </div>
        <Divider />
        <div className="row">
          <div className="col-md-6 col-plot-metrics">
            <LinePlotLastDayHumedity data={dataLastDay} />
          </div>
          <div className="col-md-6 col-plot-metrics">
            <LinePlotLastDayTemperature data={dataLastDay} />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default DashboardInvernadero1;