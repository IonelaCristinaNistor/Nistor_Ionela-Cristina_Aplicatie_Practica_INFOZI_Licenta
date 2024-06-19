import React from 'react'

import { useState } from 'react';
import { Image } from 'react-bootstrap';

import trashBefore from '../assets/trash-before.png'
import trashAfter from '../assets/trash-after.png'

const ToggleIcon = () => {
    const [isIcon1, setIsIcon1] = useState(true);
  
    const handleMouseEnter = () => {
      setIsIcon1(false);
    };
  
    const handleMouseLeave = () => {
      setIsIcon1(true);
    };
  
    return (
      <div>
        <Image
          src={isIcon1 ? trashBefore : trashAfter}
          alt="Icon"
          style={{ cursor: 'pointer', height: '50px', width: '50px' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    );
  };
  
  export default ToggleIcon;