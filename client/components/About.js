import React from 'react';

const About = () => {
	let styles = {
		fontWeight: {fontWeight: '200'},
		fontSize: {fontSize: '30px'},
		gitHub: {width: '200px', height: 'auto'},
		devPoint: {width: '150px', height: 'auto'},
		linkedin: {width: '55px', height: 'auto', marginLeft: '10px'},
		octocat: {width: '50px', height: 'auto'},
		portrait: {height: '250px', borderRadius: '50%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
		bottomMargin: {marginBottom: '20px'}
	};

	return(
		<div style={styles.fontWeight}>
			<div className="container">
				<div className="center">
					<p style={styles.fontSize}>What can you do here?</p>
				</div>
				<div className="container">
					<p className="container">
						The Haps is an app where you can discover amazing
						events that is happening right now near you.
						Go out with family and friends and find
						new places to go!
					</p>
				</div>
				<p className="center" style={styles.fontSize}>About the Developers</p>
					<div className="container">
					<p className="container">
						We saw an opportunity to connect our users with the
						city around them. Our passion for web development
						has given us an opportunity to bring our ideas
						to life. We are thankful for all the help we have
						received to our journey of becoming web developers.
					</p>
				</div>
			</div>
			<p className="center" style={styles.fontSize}>Meet the Developers</p>
			<div className="row">
				<div className="col s12 m6 center" style={styles.bottomMargin}>
					<img src="/images/taylor.jpg"
						style={styles.portrait}/>
					<p style={styles.fontSize}>Taylor Wu</p>
					<a href="https://github.com/TaylorWu21">
						<img src="/images/octocat1.png"
							style={styles.octocat} />
					</a>
					<a href="https://www.linkedin.com/in/taylorswu">
						<img src="/images/linkedin1.png"
							style={styles.linkedin} />
					</a>
					<p className="container">
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
					</p>
				</div>
				<div className="col s12 m6 center" style={styles.bottomMargin}>
					<img src="/images/person.png"
					 	style={styles.portrait}/>
					<p style={styles.fontSize}>Sean Pascoe</p>
					<a href="https://github.com/spflow">
						<img src="/images/octocat1.png"
							style={styles.octocat} />
					</a>
					<a href="">
						<img src='/images/linkedin1.png'
							style={styles.linkedin} />
					</a>
					<p className="container">
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit, sed do eiusmod tempor incididunt ut labore et
						olore magna aliqua. Ut enim ad minim veniam, quis
						nostrud exercitation ullamco laboris nisi ut aliquip
						ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore
						eu fugiat nulla pariatur. Excepteur sint occaecat
						cupidatat non proident, sunt in culpa qui officia
						deserunt mollit anim id est laborum."
					</p>
				</div>
			</div>
			<div className="center">
				<p style={styles.fontSize}>Github Repository</p>
				<a href="https://github.com/spflow/thehaps">
					<img src="/images/octocat1.png"
						style={styles.gitHub} />
				</a>
			</div>
			<div className="center container">
				<p style={styles.fontSize}>Where we came from</p>
				<a href="http://www.devpointlabs.com/">
					<img src="/images/dpl1.jpeg"
						style={styles.devPoint} />
				</a>
				<div className="container" style={styles.marginBottom}>
					<p className="container">
						Devpoint Labs is a coding bootcamp that teaches
						full stack JavaScript. Over the course of 14
						weeks we have learned many web development
						technologies like HTML5, CSS3, JavaScript,
						React, Redux, MongoDB, postgresql. We also learned
						Testing, JQuery, and Ajax. DPL has equipped
						us with new knowledge of current web-development
						technology being used in the real world.
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
