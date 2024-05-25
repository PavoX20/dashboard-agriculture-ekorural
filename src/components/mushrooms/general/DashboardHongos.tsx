import { useEffect, useState } from "react";
import "./DashboardHongos.css";
import { humedityLastDay } from "./fetchData/fetchData";
import { Divider } from "antd";
import LinePlotLastDayHumedity from "./plotsLastDay/linePlotLastDayHumedity";
import { GeneralData } from "./types/types";
import LinePlotLastDayTemperature from "./plotsLastDay/linePlotLastDayTemperature";
import LinePlotLastDayCO2 from "./plotsLastDay/linePlotLastDayCo2";
import GreenLightIcon from "../../icons/GreenLightIcon";
import RedLightIcon from "../../icons/RedLightIcon";

type DashboardProps = {
  theme: boolean; // Correct definition of props
};

const DashboardHongos: React.FC<DashboardProps> = ({ theme }) => {
  const [humedity, setHumidity] = useState<number | null>(null);
  const [co2, setCo2] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [fanStatus, setFanStatus] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [dataLastDay, setDataLastDay] = useState<GeneralData[]>([]);

  const fetchHumedityLastDay = async () => {
    try {
      const data = await humedityLastDay();
      if (data === null) return;
      setDataLastDay(data);

      // Log para verificar los datos
      console.log("Datos recibidos del backend:", data);

      // Obtener el último dato del array
      const latestData = data[data.length - 1];
      console.log("Últimos datos recibidos:", latestData);

      if (latestData) {
        setHumidity(latestData.humidity);
        setTemperature(latestData.temperature);
        setCo2(latestData.co2); // Asegúrate de que el campo sea correcto
        setFanStatus(latestData.fanStatus);

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
        <h3 style={{ color: theme ? 'white' : 'inherit' }}>Hongos Ostra</h3>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-sm-3 col-hum-co2 flex-column">
        <p className="mushroom-text" style={{ color: theme ? 'white' : 'inherit' }}>
          Humedad actual:
          {humedity === null ? (
            <span className="mushroom-value-notLoaded" style={{ color: theme ? 'white' : 'inherit' }}>
              {"Cargando..."}
            </span>
          ) : (
            <span className="mushroom-value" style={{ color: theme ? 'white' : 'inherit' }}>{humedity} %</span>
          )}
        </p>
      </div>

      <div className="col-sm-3 col-hum-co2 flex-column">
        <p className="mushroom-text" style={{ color: theme ? 'white' : 'inherit' }}>
          CO2 actual:
          {co2 === null ? (
            <span className="mushroom-value-notLoaded" style={{ color: theme ? 'white' : 'inherit' }}>
              {"Cargando..."}
            </span>
          ) : (
            <span className="mushroom-value" style={{ color: theme ? 'white' : 'inherit' }}>{co2} ppm</span>
          )}
        </p>
      </div>

      <div className="col-sm-3 col-hum-co2 flex-column">
        <p className="mushroom-text" style={{ color: theme ? 'white' : 'inherit' }}>
          Temperatura actual:
          {temperature === null ? (
            <span className="mushroom-value-notLoaded" style={{ color: theme ? 'white' : 'inherit' }}>
              {"Cargando..."}
            </span>
          ) : (
            <span className="mushroom-value" style={{ color: theme ? 'white' : 'inherit' }}>{temperature} ppm</span>
          )}
        </p>
      </div>

      <div className="col-sm-3 col-hum-co2 d-flex flex-column">
        <p style={{ color: theme ? 'white' : 'inherit' }}>Estado del ventilador:</p>

        <div className="d-flex justify-content-center align-items-center">
          <div className="fan-box d-flex flex-column align-items-center justify-content-center">
            {fanStatus === null ? (
              <div className="mushroom-value-notLoaded" >
                {"Cargando..."}
              </div>
            ) : fanStatus === "Activated" ? (
              <>
                <GreenLightIcon />
                <p className="activated-deactivaded-text">Activado</p>
              </>
            ) : (
              <>
                <RedLightIcon />
                <br />
                <p className="activated-deactivaded-text">Desactivado</p>
              </>
            )}
          </div>
        </div>
      </div>
      <br />

      <div
        className="mushroom-value-lastUpdated"
        style={{ marginTop: "-3rem", color: theme ? 'white' : 'inherit' }}
      >
        Datos actualizados hace {time} minuto(s)
      </div>
    </div>
    <Divider />
    <div className="row">
      <div className="col-md-4 col-plot-metrics">
        <LinePlotLastDayHumedity data={dataLastDay} theme={theme}/>
      </div>
      <div className="col-md-4 col-plot-metrics">
        <LinePlotLastDayTemperature data={dataLastDay} theme={theme}/>
      </div>
      <div className="col-md-4 col-plot-metrics">
        <LinePlotLastDayCO2 data={dataLastDay} theme={theme} threshold={440} />
      </div>
    </div>
  </div>
</>
  );
};

export default DashboardHongos;
