import React from 'react';
import UrkuwaykuImage from '../../assets/urkuwaykuLogo.png'; // Adjust the path according to your project structure

const UrkuwaykuLogo: React.FC = () => {
  return (
    <div>
      <img src={UrkuwaykuImage} alt="UrkuwaykuImage" style={{height:"75px"} } />
    </div>
  );
};

export default UrkuwaykuLogo;
