import { useState, useContext, useEffect } from "react";
import { Layout, notification } from "antd";
import "./Sidebar.css";
import MenuList from "./MenuList";
import ToggleThemeButton from "./ToggleThemeButton";
import { ThresholdContext } from "../settings/context/ThresholdContext";
import UrkuwaykuLogo from "../icons/UrkuwaykuLogo";
import { SidebarProps } from "../types/sharedTypes";
import { valuesMushroomLastDay, valuesGreenhouse1LastDay, valuesGreenhouse3LastDay } from "./fetchData/fetchData"; // Importar funciones de fetch

const { Header, Sider, Content } = Layout;

export const Sidebar = ({ Dashboard }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const { thresholds } = useContext(ThresholdContext);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, description: string) => {
    api.info({
      message,
      description,
      placement: "topRight",
    });
  };

  const checkThresholds = async () => {
    try {
      const dataMushroom = await valuesMushroomLastDay();
      const dataInvernadero1 = await valuesGreenhouse1LastDay();
      const dataInvernadero3 = await valuesGreenhouse3LastDay();

      const latestDataMushroom = dataMushroom[dataMushroom.length - 1];
      const latestDataInvernadero1 = dataInvernadero1[dataInvernadero1.length - 1];
      const latestDataInvernadero3 = dataInvernadero3[dataInvernadero3.length - 1];

      // Check thresholds and send notifications for Mushroom
      if (latestDataMushroom.humidity < thresholds.hongoHumidity) {
        openNotification("Alerta de Humedad - Hongos", "La humedad ha caído por debajo del umbral.");
      }
      if (latestDataMushroom.temperature < thresholds.hongoTemp) {
        openNotification("Alerta de Temperatura - Hongos", "La temperatura ha caído por debajo del umbral.");
      }
      if (latestDataMushroom.co2 !== undefined && latestDataMushroom.co2 < thresholds.hongoCO2) {
        openNotification("Alerta de CO2 - Hongos", "El CO2 ha caído por debajo del umbral.");
      }

      // Check thresholds and send notifications for Invernadero 1
      if (latestDataInvernadero1.humidity < thresholds.inv1Humidity) {
        openNotification("Alerta de Humedad - Invernadero 1", "La humedad ha caído por debajo del umbral.");
      }
      if (latestDataInvernadero1.temperature < thresholds.inv1Temp) {
        openNotification("Alerta de Temperatura - Invernadero 1", "La temperatura ha caído por debajo del umbral.");
      }

      // Check thresholds and send notifications for Invernadero 3
      if (latestDataInvernadero3.humidity < thresholds.inv3Humidity) {
        openNotification("Alerta de Humedad - Invernadero 3", "La humedad ha caído por debajo del umbral.");
      }
      if (latestDataInvernadero3.temperature < thresholds.inv3Temp) {
        openNotification("Alerta de Temperatura - Invernadero 3", "La temperatura ha caído por debajo del umbral.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    checkThresholds();
    const interval = setInterval(checkThresholds, 5000);
    return () => clearInterval(interval);
  }, [thresholds]);

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      {contextHolder}
      <Sider
        width={220}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className={`sidebar ${darkTheme ? "sidebar-dark" : "sidebar-light"}`}
        theme={darkTheme ? "dark" : "light"}
        style={{
          height: "100vh",
          overflow: "auto",
          position: "fixed",
          left: 0,
          top: 0,
          fontSize: "1.2em",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 5px",
          }}
        >
          <UrkuwaykuLogo />
        </div>

        <MenuList theme={darkTheme} />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 220 }}>
        <Header
          className="header"
          style={{ backgroundColor: darkTheme ? "rgb(2, 21, 39)" : "white" }}
        >
          <h1
            style={{ marginLeft: "20px", color: darkTheme ? "white" : "black" }}
          >
            Dashboard Urkuwayku
          </h1>
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Header>

        <Layout
          className={`content ${
            darkTheme ? "layout-content-dark" : "layout-content-light"
          }`}
        >
          <Content
            className={`content ${
              darkTheme ? "content-dark" : "content-light"
            }`}
            style={{ margin: "19px" }}
          >
            <div
              className={`container-fluid ${
                darkTheme ? "container-body-dark" : "container-body-light"
              }`}
            >
              <Dashboard theme={darkTheme} thresholds={thresholds} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
