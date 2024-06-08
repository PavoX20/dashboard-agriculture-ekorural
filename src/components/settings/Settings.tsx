import React, { useState, useContext, useEffect } from "react";
import { Input, Form, Button } from "antd";
import "./Settings.css";
import { ThresholdContext } from "../context/ThresholdContext";
import { DashboardProps } from "../types/SharedTypes";

const Settings: React.FC<DashboardProps> = ({ theme }) => {
  const { thresholds, setThresholds } = useContext(ThresholdContext);
  const [localThresholds, setLocalThresholds] = useState(thresholds);
  const [buttonText, setButtonText] = useState("Guardar Umbrales");

  useEffect(() => {
    setLocalThresholds(thresholds);
  }, [thresholds]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalThresholds({ ...localThresholds, [name]: Number(value) });
  };

  const handleSubmit = () => {
    setButtonText("Guardando...");
    setThresholds(localThresholds);
    localStorage.setItem("thresholds", JSON.stringify(localThresholds));
    setTimeout(() => {
      setButtonText("Guardado");
      setTimeout(() => {
        setButtonText("Guardar Umbrales");
      }, 5000);
    }, 1000);
  };

  return (
    <div className="settings-container">
      <Form layout="vertical">
        <div className="settings-row">
          <div className="settings-col">
            <h4>Configuración Invernadero Hongos Ostra</h4>
            <Form.Item label="Umbral Temperatura">
              <Input
                className="input-text"
                placeholder="Umbral Temperatura"
                name="hongoTemp"
                value={localThresholds.hongoTemp}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Umbral Humedad">
              <Input
                className="input-text"
                placeholder="Umbral Humedad"
                name="hongoHumidity"
                value={localThresholds.hongoHumidity}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Umbral CO2">
              <Input
                className="input-text"
                placeholder="Umbral CO2"
                name="hongoCO2"
                value={localThresholds.hongoCO2}
                onChange={handleChange}
              />
            </Form.Item>
          </div>

          <div className="settings-col">
            <h4>Configuración Invernadero 1</h4>
            <Form.Item label="Umbral Temperatura">
              <Input
                className="input-text"
                placeholder="Umbral Temperatura"
                name="inv1Temp"
                value={localThresholds.inv1Temp}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Umbral Humedad">
              <Input
                className="input-text"
                placeholder="Umbral Humedad"
                name="inv1Humidity"
                value={localThresholds.inv1Humidity}
                onChange={handleChange}
              />
            </Form.Item>
          </div>

          <div className="settings-col">
            <h4>Configuración Invernadero 2</h4>
            <Form.Item label="Umbral Temperatura">
              <Input
                className="input-text"
                placeholder="Umbral Temperatura"
                name="inv2Temp"
                value={localThresholds.inv2Temp}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Umbral Humedad">
              <Input
                className="input-text"
                placeholder="Umbral Humedad"
                name="inv2Humidity"
                value={localThresholds.inv2Humidity}
                onChange={handleChange}
              />
            </Form.Item>
          </div>

          <div className="settings-col">
            <h4>Configuración Invernadero 3</h4>
            <Form.Item label="Umbral Temperatura">
              <Input
                className="input-text"
                placeholder="Umbral Temperatura"
                name="inv3Temp"
                value={localThresholds.inv3Temp}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Umbral Humedad">
              <Input
                className="input-text"
                placeholder="Umbral Humedad"
                name="inv3Humidity"
                value={localThresholds.inv3Humidity}
                onChange={handleChange}
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Button
              type="primary"
              className="save-button"
              onClick={handleSubmit}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Settings;
