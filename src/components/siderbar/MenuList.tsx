import { Menu } from "antd";
import type { MenuProps } from "antd";
import MushroomIcon from "../icons/MushroomIcon";
import PlantsIcon from "../icons/PlantsIcon";
import Greenhouse from "../icons/Greenhouse";
import { Link } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
  url?: string
): MenuItem {
  return {
    label: url ? (
      <Link to={url} style={{ textDecoration: "none" }}>
        {label}
      </Link>
    ) : (
      label
    ),
    key,
    icon,
    children,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(
    "General",
    "general",
    <PlantsIcon />,
    undefined,
    undefined,
    "/dashboard"
  ),
  getItem("Hongos", "hongos", <MushroomIcon />, [
    getItem(
      "General",
      "gMushroom",
      undefined,
      undefined,
      undefined,
      "/dashboard/mushroom"
    ),
    getItem(
      "Comparación",
      "mushroomComparation",
      undefined,
      undefined,
      undefined,
      "/dashboard/comparation_mushroom"
    ),
  ]),

  getItem("Invernadero 1", "inv1", <Greenhouse />, [
    getItem(
      "General",
      "gInv1",
      undefined,
      undefined,
      undefined,
      "/dashboard/invernadero_1"
    ),
    getItem(
      "Comparación",
      "inv1Comparation",
      undefined,
      undefined,
      undefined,
      "/dashboard/comparation_invernadero_1"
    ),
  ]),
  getItem("Invernadero 2", "inv2", <Greenhouse />, [
    getItem(
      "General",
      "gInv2",
      undefined,
      undefined,
      undefined,
      "/dashboard/invernadero_2"
    ),
    getItem(
      "Comparación",
      "inv2Comparation",
      undefined,
      undefined,
      undefined,
      "/dashboard/comparation_invernadero_2"
    ),
  ]),
  getItem("Invernadero 3", "inv3", <Greenhouse />, [
    getItem(
      "General",
      "gInv3",
      undefined,
      undefined,
      undefined,
      "/dashboard/invernadero_3"
    ),
    getItem(
      "Comparación",
      "inv2Comparation",
      undefined,
      undefined,
      undefined,
      "/dashboard/comparation_invernadero_3"
    ),
  ]),
  getItem("Configuración", "settings", <SettingOutlined style={{fontSize: "20px"}} />, undefined, undefined, "/dashboard/settings"),
];

interface MenuListProps {
  theme: boolean;
}

const MenuList = ({ theme }: MenuListProps) => {
  return (
    <Menu
      className="menu-bar"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
      theme={theme ? "dark" : "light"}
      style={{ fontSize: "1.1rem" }}
    />
  );
};

export default MenuList;
