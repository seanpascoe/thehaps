import React from 'react';
import FaSliders from 'react-icons/lib/fa/sliders';

export default () => {
  return (
    <a className="btn-floating btn-large waves-effect waves-light filter-sideNav"
       data-activates="slide-out1"
       style={{ position: 'fixed', bottom: '10px', right: '10px', backgroundColor: '#2C3E50' }}>
      <FaSliders size={'28px'} style={{marginBottom: '1px'}}/>
    </a>
  );
};
