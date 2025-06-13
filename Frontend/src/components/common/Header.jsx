import React from 'react';
import '/src/components/css/Header.css'

const Header = () => {
  return (
    <div style={{ position: 'relative', textAlign: 'center', backgroundColor: '#B0C4DE', padding: '20px' }}>
      <img 
        src="path_to_bajaj_pulsar_220f_image.jpg" 
        alt="Bajaj Pulsar 220F" 
        style={{ width: '100%', maxWidth: '600px', borderRadius: '10px' }} 
      />
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
        <button style={{ backgroundColor: '#FFA500', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Get Start
        </button>
      </div>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <img 
          src="path_to_motor_octane_logo.png" 
          alt="MOTOR OCTANE Logo" 
          style={{ width: '100px' }} 
        />
      </div>
    </div>
  );
};

export default Header;
