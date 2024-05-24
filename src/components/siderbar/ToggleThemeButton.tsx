import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { Button } from "antd";

interface ToggleThemeButtonProps {
  darkTheme: boolean;
  toggleTheme: () => void;
}

const ToggleThemeButton = ({ darkTheme, toggleTheme }: ToggleThemeButtonProps) => {
  return (
    <div className="toggle-theme-btn">
      <Button onClick={toggleTheme} style={{padding: "0px", height: "3rem", width:  "3rem"}}>
        {darkTheme ? <HiOutlineSun style={{fontSize: "2rem"}} /> : <HiOutlineMoon style={{fontSize: "2rem"}} />}
      </Button>
    </div>
  );
};

export default ToggleThemeButton;
