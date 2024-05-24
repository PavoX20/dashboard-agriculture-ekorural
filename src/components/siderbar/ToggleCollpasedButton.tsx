
import { Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

interface ToggleThemeButtonProps {
  collapsed: boolean;
  changeCollapsed: () => void;
}

const ToggleCollapsedutton = ({
  collapsed,
  changeCollapsed,
}: ToggleThemeButtonProps) => {
  return (
    <div className="toggle-collpased-btn">
      <Button className="toggle-btn-collapsed" onClick={changeCollapsed} style={{padding: "0px", height: "2rem", width:  "2rem"}}>
        {collapsed ? <MenuUnfoldOutlined style={{fontSize: "1.2rem"}}/> : <MenuFoldOutlined style={{fontSize: "1.2rem"}} />}
      </Button>
    </div>
  );
};

export default ToggleCollapsedutton;
