import React from 'react';
import FaFrown from 'react-icons/lib/fa/frown-o';

const NotFound = () => {
  let styles = {
    title: {fontWeight: '300', fontSize: '30px'}
  };
  return(
  <div className='center'>
    <div style={styles.title}>OH SHEET! 404 PAGE</div>
    <div><a href='/' style={styles.title}>Come Back Home</a></div>
    <FaFrown style={{color: '#2C3E50'}} size={'300px'} />
  </div>
  );
};

export default NotFound;
