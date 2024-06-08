import { useState, useContext } from "react";
import { Layout } from "antd";
import "./Sidebar.css";
import MenuList from "./MenuList";
import ToggleThemeButton from "./ToggleThemeButton";
import { ThresholdContext } from "./context/ThresholdContext";
import UrkuwaykuLogo from "../icons/UrkuwaykuLogo";
import { SidebarProps } from "../types/SharedTypes";

const { Header, Sider, Content } = Layout;

export const Sidebar = ({ Dashboard }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const { thresholds } = useContext(ThresholdContext);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
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
