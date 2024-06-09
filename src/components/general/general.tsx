import { useEffect, useState } from "react";
import "./general.css";
import { valuesMushroomLastDay, valuesGreenhouse1LastDay, valuesGreenhouse3LastDay } from "./fetchData/fetchData";
import { Divider } from "antd";
import { DashboardProps } from "../types/sharedTypes";
import GreenLightIcon from "../icons/GreenLightIcon";
import RedLightIcon from "../icons/RedLightIcon";

const DashboardGeneral: React.FC<DashboardProps> = ({ theme }) => {
  const [humedityMushroom, setHumidityMushroom] = useState<number | null>(null);
  const [co2Mushroom, setCo2Mushroom] = useState<number | null>(null);
  const [temperatureMushroom, setTemperatureMushroom] = useState<number | null>(null);
  const [fanStatusMushroom, setFanStatusMushroom] = useState<string | null>(null);
  const [timeMushroom, setTimeMushroom] = useState<string | null>(null);

  const [humedityInvernadero1, setHumidityInvernadero1] = useState<number | null>(null);
  const [temperatureInvernadero1, setTemperatureInvernadero1] = useState<number | null>(null);
  const [timeInvernadero1, setTimeInvernadero1] = useState<string | null>(null);

  const [humedityInvernadero3, setHumidityInvernadero3] = useState<number | null>(null);
  const [temperatureInvernadero3, setTemperatureInvernadero3] = useState<number | null>(null);
  const [timeInvernadero3, setTimeInvernadero3] = useState<string | null>(null);

  const fetchMushroomLastDay = async () => {
    try {
      const data = await valuesMushroomLastDay();
      if (data === null) return;

      const latestData = data[data.length - 1];
      console.log("Últimos datos recibidos:", latestData);

      if (latestData) {
        setHumidityMushroom(latestData.humidity);
        setTemperatureMushroom(latestData.temperature);
        setCo2Mushroom(latestData.co2);
        setFanStatusMushroom(latestData.fanStatus);

        const lastUpdated = new Date(latestData.timestamp);
        const now = new Date();

        const difference = now.getTime() - lastUpdated.getTime();
        const minutesAgo = Math.floor(difference / 60000);

        setTimeMushroom(minutesAgo.toString());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchLastDayInvernadero1 = async () => {
    try {
      const data = await valuesGreenhouse1LastDay();
      if (data === null) return;

      const latestData = data[data.length - 1];
      console.log("Últimos datos recibidos:", latestData);

      if (latestData) {
        setHumidityInvernadero1(latestData.humidity);
        setTemperatureInvernadero1(latestData.temperature);

        const lastUpdated = new Date(latestData.timestamp);
        const now = new Date();

        const difference = now.getTime() - lastUpdated.getTime();
        const minutesAgo = Math.floor(difference / 60000);

        setTimeInvernadero1(minutesAgo.toString());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchLastDayInvernadero3 = async () => {
    try {
      const data = await valuesGreenhouse3LastDay();
      if (data === null) return;

      const latestData = data[data.length - 1];
      console.log("Últimos datos recibidos:", latestData);

      if (latestData) {
        setHumidityInvernadero3(latestData.humidity);
        setTemperatureInvernadero3(latestData.temperature);

        const lastUpdated = new Date(latestData.timestamp);
        const now = new Date();

        const difference = now.getTime() - lastUpdated.getTime();
        const minutesAgo = Math.floor(difference / 60000);

        setTimeInvernadero3(minutesAgo.toString());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchMushroomLastDay();
    fetchLastDayInvernadero1();
    fetchLastDayInvernadero3();
    const interval = setInterval(() => {
      fetchMushroomLastDay();
      fetchLastDayInvernadero1();
      fetchLastDayInvernadero3();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid container-body">
      {/* Hongos Ostra */}
      <div className="row row-body">
        <div className="col-12">
          <h3 style={{ color: theme ? "white" : "inherit" }}>Hongos</h3>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-3 col-hum-co2 flex-column">
          <p className="mushroom-text" style={{ color: theme ? "white" : "inherit" }}>
            Humedad actual:
            {humedityMushroom === null ? (
              <span className="mushroom-value-notLoaded" style={{ color: theme ? "white" : "inherit" }}>
                {"Cargando..."}
              </span>
            ) : (
              <span className="mushroom-value" style={{ color: theme ? "white" : "inherit" }}>
                {humedityMushroom} %
              </span>
            )}
          </p>
        </div>
        <div className="col-sm-3 col-hum-co2 flex-column">
          <p className="mushroom-text" style={{ color: theme ? "white" : "inherit" }}>
            CO2 actual:
            {co2Mushroom === null ? (
              <span className="mushroom-value-notLoaded" style={{ color: theme ? "white" : "inherit" }}>
                {"Cargando..."}
              </span>
            ) : (
              <span className="mushroom-value" style={{ color: theme ? "white" : "inherit" }}>
                {co2Mushroom} ppm
              </span>
            )}
          </p>
        </div>
        <div className="col-sm-3 col-hum-co2 flex-column">
          <p className="mushroom-text" style={{ color: theme ? "white" : "inherit" }}>
            Temperatura actual:
            {temperatureMushroom === null ? (
              <span className="mushroom-value-notLoaded" style={{ color: theme ? "white" : "inherit" }}>
                {"Cargando..."}
              </span>
            ) : (
              <span className="mushroom-value" style={{ color: theme ? "white" : "inherit" }}>
                {temperatureMushroom} &#176;C
              </span>
            )}
          </p>
        </div>
        <div className="col-sm-3 col-hum-co2 d-flex flex-column">
          <p style={{ color: theme ? "white" : "inherit" }}>Estado del ventilador:</p>
          <div className="d-flex justify-content-center align-items-center">
            <div className="fan-box d-flex flex-column align-items-center justify-content-center">
              {fanStatusMushroom === null ? (
                <div className="mushroom-value-notLoaded">{"Cargando..."}</div>
              ) : fanStatusMushroom === "Activated" ? (
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
        <div className="mushroom-value-lastUpdated" style={{ color: theme ? "white" : "inherit" }}>
          Datos actualizados hace {timeMushroom} minuto(s)
        </div>
      </div>
      <Divider />

      {/* Invernadero 1 */}
      <div className="row row-body">
        <div className="col-12">
          <h3 style={{ color: theme ? "white" : "inherit" }}>Invernadero 1</h3>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-6 col-hum-temp flex-column">
          <p className="invernadero-text" style={{ color: theme ? "white" : "inherit" }}>
            Humedad actual:
            {humedityInvernadero1 === null ? (
              <span className="invernadero-value-notLoaded" style={{ color: theme ? "white" : "inherit" }}>
                {"Cargando..."}
              </span>
            ) : (
              <span className="invernadero-value" style={{ color: theme ? "white" : "inherit" }}>
                {humedityInvernadero1} %
              </span>
            )}
          </p>
        </div>
        <div className="col-sm-6 col-hum-temp flex-column">
          <p className="invernadero-text" style={{ color: theme ? "white" : "inherit" }}>
            Temperatura actual:
            {temperatureInvernadero1 === null ? (
              <span className="invernadero-value-notLoaded" style={{ color: theme ? "white" : "inherit" }}>
                {"Cargando..."}
              </span>
            ) : (
              <span className="invernadero-value" style={{ color: theme ? "white" : "inherit" }}>
                {temperatureInvernadero1} &#176;C
              </span>
            )}
          </p>
        </div>
        <div className="col-12">
          <p className="invernadero-value-lastUpdated" style={{ color: theme ? "white" : "inherit" }}>
            Datos actualizados hace {timeInvernadero1} minuto(s)
          </p>
        </div>
      </div>
      <Divider />
            <h4 style={{ color: theme ? "white" : "inherit" }}>
              Invernadero 2 - Próximamente...
            </h4>
      <Divider />

      {/* Invernadero 3 */}
      <div className="row row-body">
        <div className="col-12">
          <h3 style={{ color: theme ? "white" : "inherit" }}>Invernadero 3</h3>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-6 col-hum-temp flex-column">
          <p className="invernadero-text" style={{ color: theme ? "white" : "inherit" }}>
            Humedad actual:
            {humedityInvernadero3 === null ? (
              <span className="invernadero-value-notLoaded" style={{ color: theme ? "white" : "inherit" }}>
                {"Cargando..."}
              </span>
            ) : (
              <span className="invernadero-value" style={{ color: theme ? "white" : "inherit" }}>
                {humedityInvernadero3} %
              </span>
            )}
          </p>
        </div>
        <div className="col-sm-6 col-hum-temp flex-column">
          <p className="invernadero-text" style={{ color: theme ? "white" : "inherit" }}>
            Temperatura actual:
            {temperatureInvernadero3 === null ? (
              <span className="invernadero-value-notLoaded" style={{ color: theme ? "white" : "inherit" }}>
                {"Cargando..."}
              </span>
            ) : (
              <span className="invernadero-value" style={{ color: theme ? "white" : "inherit" }}>
                {temperatureInvernadero3} &#176;C
              </span>
            )}
          </p>
        </div>
        <div className="col-12">
          <p className="invernadero-value-lastUpdated" style={{ color: theme ? "white" : "inherit" }}>
            Datos actualizados hace {timeInvernadero3} minuto(s)
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardGeneral;
