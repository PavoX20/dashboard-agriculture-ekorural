interface LogoProps {
    darkTheme: boolean;
    
}

const Logo = ({darkTheme}:LogoProps) => {
  return (
    <div className="logo">
      <div className="icon-logo">
        <i className="bi bi-fire" style={{color: darkTheme ? "white" : "black"}}></i>
      </div>
    </div>
  );
};

export default Logo;
