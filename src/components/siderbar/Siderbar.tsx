import { useEffect, useState } from "react";
import { Layout } from "antd";
import "./Sidebar.css";
import Logo from "../icons/Logo";
import MenuList from "./MenuList";
import ToggleThemeButton from "./ToggleThemeButton";

type DashboardProps = {
  theme: boolean;
};

type SidebarProps = {
  Dashboard: React.ComponentType<DashboardProps>;
};

const { Header, Sider, Content } = Layout;

export const Sidebar = ({ Dashboard }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(0);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const changeCollapsedWidth = () => {
    if (collapsedWidth === 80) {
      setCollapsedWidth(0);
    } else {
      setCollapsedWidth(80);
    }
  };

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider
        collapsible={true}
        collapsedWidth={collapsedWidth}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        onBreakpoint={changeCollapsedWidth}
        breakpoint="sm"
        className={`sidebar ${darkTheme ? "sidebar-dark" : "sidebar-light"}`}
        theme={darkTheme ? "dark" : "light"}
        style={{ height: "100vh", overflow: "auto", position: "fixed", left: 0, top: 0 }}
      >
        <Logo darkTheme={darkTheme} />
        <MenuList theme={darkTheme} />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? collapsedWidth : 200 }}>
        <Header
          className="header"
          style={{ backgroundColor: darkTheme ? "rgb(2, 21, 39)" : "white" }}
        >
          <h1 style={{ marginLeft: '20px', color: darkTheme ? "white" : "black" }}>
            Dashboard
          </h1>
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Header>
        <Content className={darkTheme ? 'layout-dark' : 'layout-light'}>
          <div className={`container-fluid ${darkTheme ? 'container-body-dark' : 'container-body-light'}`}>
            <Dashboard theme={darkTheme} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
