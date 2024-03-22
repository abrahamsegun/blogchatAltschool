import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import MobileDash from './MobileDash';

const DisplayDashboard: React.FC = () => {
  const [display, setDisplay] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setDisplay(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
      {display ? <MobileDash /> : <Dashboard />}
    </div>
  );
};

export default DisplayDashboard;
