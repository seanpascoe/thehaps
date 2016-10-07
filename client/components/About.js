import React from 'react';
import FaGithub	from 'react-icons/lib/fa/github-square';
import FaLinkedin from 'react-icons/lib/fa/linkedin-square';
import GoGithub from 'react-icons/lib/go/mark-github';

const About = () => {
  let styles = {
    fontWeight: {fontWeight: '300'},
    title: {fontSize: '30px', padding: '20px 0 10px'},
    devPoint: {width: '150px', height: 'auto'},
    portrait: {height: '250px', borderRadius: '50%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    bottomMargin: {marginBottom: '20px'},
    background: {backgroundColor: '#2C3E50', color: '#ECF0F1', padding: '20px 0 20px', fontWeight: '300'},
    linkIcon: {color: 'white', margin: '10px'},
    developerBackground: {backgroundColor: '#2980B9', color: '#ECF0F1', padding: '20px 0 20px'}
  };

  return(
		<div style={styles.background}>
			<div className="container">
				<div style={{padding: '0 0 25px 0'}}>
					<div className="center">
						<div style={styles.title}>What Can You Do Here?</div>
					</div>
					<div className="container">
						<div className="container">
							The Haps is an app where you can discover amazing
							events that is happening right now near you.
							Go out with family and friends and find
							new places to go!
						</div>
					</div>
					<div className="center" style={styles.title}>About The Developers</div>
					<div className="container">
						<div className="container">
							We saw an opportunity to connect our users with the
							city around them. Our passion for web development
							has given us an opportunity to bring our ideas
							to life. We are thankful for all the help we have
							received on our journey of becoming web developers.
						</div>
					</div>
				</div>
			</div>
			<div className="row" style={styles.developerBackground}>
				<div className="center" style={styles.title}>Meet The Developers</div>
				<div className="col s12 m6 center" style={styles.bottomMargin}>
					<img src="/images/taylor.jpg"
						style={styles.portrait}/>
					<div style={styles.title}>Taylor Wu</div>
					<a href="https://github.com/TaylorWu21" target='_blank'>
						<FaGithub size={'60px'} style={styles.linkIcon} />
					</a>
					<a href="https://www.linkedin.com/in/taylorswu" target='_blank'>
						<FaLinkedin size={'60px'} style={styles.linkIcon} />
					</a>
					<div className="container">
						I am currently a senior at the University of Utah.
						I will graduate in spring of 2017 with a BS degree
						in Information Systems. The summer of 2016 is where
						I found my passion for programming. Having no prior
						experience with programming before, I have learned
						to enjoy the struggle of being a programmer. I hope
						my understanding of programming will be an integral
						part of my professional life and hopefully I will be
						able to create a career out of it. During my free time
						I love to play video games and snowboard!
					</div>
				</div>
				<div className="col s12 m6 center" style={styles.bottomMargin}>
					<img src="/images/person.png"
            style={styles.portrait}/>
					<div style={styles.title}>Sean Pascoe</div>
					<a href="https://github.com/spflow" target='_blank'>
						<FaGithub size={'60px'} style={styles.linkIcon} />
					</a>
					<a href="" target='_blank'>
						<FaLinkedin size={'60px'} style={styles.linkIcon} />
					</a>
					<div className="container">
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit, sed do eiusmod tempor incididunt ut labore et
						olore magna aliqua. Ut enim ad minim veniam, quis
						nostrud exercitation ullamco laboris nisi ut aliquip
						ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore
						eu fugiat nulla pariatur. Excepteur sint occaecat
						cupidatat non proident, sunt in culpa qui officia
						deserunt mollit anim id est laborum."
					</div>
				</div>
			</div>
			<div className="center">
				<div style={styles.title}>Github Repository</div>
				<a href="https://github.com/spflow/thehaps" target='_blank'>
					<GoGithub size={'250px'} style={{color: 'white'}}/>
				</a>
			</div>
			<div className="center container">
				<div style={styles.title}>Where we came from</div>
				<a href="http://www.devpointlabs.com/" target='_blank'>
					<img src="/images/dpl.png"
						style={styles.devPoint} />
				</a>
				<div className="container" style={styles.marginBottom}>
					<div className="container" style={{marginBottom: '30px'}}>
						Devpoint Labs is a coding bootcamp that teaches
						full stack JavaScript. Over the course of 14
						weeks we have learned many web development
						technologies like HTML5, CSS3, JavaScript,
						React, Redux, MongoDB, postgresql. We also learned
						Testing, JQuery, and Ajax. DPL has equipped
						us with new knowledge of current web-development
						technology being used in the real world.
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
