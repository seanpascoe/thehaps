import React from 'react';

const ListSettingsLabel = (props) => {
  let styles = {
    head: {display: 'flex', justifyContent: 'center', fontSize: '18px', paddingTop: '5px', paddingBottom: '5px', marginBottom: '0', fontWeight: '300', cursor: 'pointer'},
    unit: {display: 'inline-block', marginLeft: '15px', marginRight: '15px'},
    label: {fontSize: '0.6em'},
    value: {marginLeft: '5px'}
  };

  return (
    <div data-activates="slide-out1" className="filter-sideNav" style={styles.head}>
      <div style={styles.unit}>
        <div style={styles.label}>Category:</div>
        <div style={styles.value}>{`"${props.selectedCategory}"`}</div>
      </div>
      <div style={styles.unit}>
        <div style={styles.label}>Range:</div>
        <div style={styles.value}>{` ${props.startDate} -- ${props.endDate}`}</div>
      </div>
      <div style={styles.unit}>
        <div style={styles.label}>Events:</div>
        <div style={styles.value}>{props.numFilteredEvents}</div>
      </div>
    </div>
  );
};

export default ListSettingsLabel;
