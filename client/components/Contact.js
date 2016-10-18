import React from 'react';

const Contact = () => {
  let styles = {
    title: {fontSize: '30px', padding: '20px 0 10px'},
    contact: {fontSize: '18px'}
  };

  return(
		<div>
			<div className="container">
				<div className="center">
					<div style={styles.title}>Questions or Problems?</div>
          <div style={styles.contact}>Contact: <a href="mailto:admin@thehapsmap.com">admin@thehapsmap.com</a></div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
