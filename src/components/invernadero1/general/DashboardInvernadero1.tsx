import { useEffect, useState } from "react";
import "./DashboardInvernadero1.css";
import { humedityLastDay } from "./fetchData/fetchData";
import { Divider, Button } from "antd";
import { GeneralData, DashboardProps } from "../../types/sharedTypes";
import CombinedLinePlot from "./plotsLastDay/CombinedLinePlot";
import DataTableInvernadero from "./DataTableInvernadero";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const DashboardInvernadero1: React.FC<DashboardProps> = ({
  theme,
  thresholds,
}) => {
  const [humedity, setHumidity] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [dataLastDay, setDataLastDay] = useState<GeneralData[]>([]);

  const fetchHumedityLastDay = async () => {
    try {
      const data = await humedityLastDay();
      if (!Array.isArray(data)) {
        console.error("Expected data to be an array, but got:", data);
        return;
      }
      setDataLastDay(data);

      const latestData = data[data.length - 1];
      console.log("Últimos datos recibidos:", latestData);

      if (latestData) {
        setHumidity(latestData.humidity);
        setTemperature(latestData.temperature);

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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataLastDay);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos Invernadero");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "datos_invernadero.xlsx");
  };

  return (
    <div className="container-fluid container-body">
      <div className="row row-body">
        <div className="col-12">
          <h3 style={{ color: theme ? "white" : "inherit" }}>Invernadero 1</h3>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-6 col-hum-temp flex-column">
          <p
            className="invernadero-text"
            style={{ color: theme ? "white" : "inherit" }}
          >
            Humedad actual:
            {humedity === null ? (
              <span
                className="invernadero-value-notLoaded"
                style={{ color: theme ? "white" : "inherit" }}
              >
                {"Cargando..."}
              </span>
            ) : (
              <span
                className="invernadero-value"
                style={{ color: theme ? "white" : "inherit" }}
              >
                {humedity} %
              </span>
            )}
          </p>
        </div>

        <div className="col-sm-6 col-hum-temp flex-column">
          <p
            className="invernadero-text"
            style={{ color: theme ? "white" : "inherit" }}
          >
            Temperatura actual:
            {temperature === null ? (
              <span
                className="invernadero-value-notLoaded"
                style={{ color: theme ? "white" : "inherit" }}
              >
                {"Cargando..."}
              </span>
            ) : (
              <span
                className="invernadero-value"
                style={{ color: theme ? "white" : "inherit" }}
              >
                {temperature} &#176;C
              </span>
            )}
          </p>
        </div>

        <div className="col-12">
          <p
            className="invernadero-value-lastUpdated"
            style={{ color: theme ? "white" : "inherit" }}
          >
            Datos actualizados hace {time} minuto(s)
          </p>
        </div>
      </div>
      <Divider />
      <div className="row">
        <div className="col-12 table">
          <CombinedLinePlot
            data={dataLastDay}
            theme={theme}
            tempThreshold={thresholds.inv1Temp}
            humidityThreshold={thresholds.inv1Humidity}
            title="Medidas Combinadas"
          />
        </div>
      </div>
      <Divider />
      <div className="row">
        <div className="col-12">
          <DataTableInvernadero data={dataLastDay} theme={theme} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <Button
            type="default"
            onClick={exportToExcel}
            style={{
              margin: "10px",
              backgroundColor: "#1890ff",
              color: "white",
              border: "none",
            }}
          >
            Guardar en Excel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardInvernadero1;
