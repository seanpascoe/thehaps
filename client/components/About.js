import React from 'react';

const About = () => (
	<div>
		<div className="container">
			<div className="center">
				<h2>About</h2>
				<h4>What can you do here?</h4>
			</div>
			<div className="container">
				<p className="container">
					The Haps is an app where you can discover amazing
					events that is happening right now near you.
					Go out with family and friends and find
					new places to go!
				</p>
			</div>
			<h2 className="center">About the Developers</h2>
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
		<h2 className="center">Meet the Developers</h2>
		<div className="row">
			<div className="col s12 m6 center">
				<img src="/images/person.png" />
				<h4>Taylor Wu</h4>
				<img src="/images/octocat.png"
					style={{height:'50px', width:'auto'}} />
				<img src="/images/linkedin.png"
					style={{height:'50px', width:'auto'}} />
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
			<div className="col s12 m6 center">
				<img src="/images/person.png" />
				<h4>Sean Pascoe</h4>
				<img src="/images/octocat.png"
					style={{height:'50px', width:'auto'}} />
				<img src='/images/linkedin.png'
					style={{height:'50px', width:'auto'}} />
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
			<h2>Github Repository</h2>
			<img src="/images/octocat.png"
				style={{height:'300px', width:'auto'}} />
		</div>
		<div className="center container">
			<h2>Where we came from</h2>
			<img src="/images/dpl.jpeg"
				style={{height:'300px', width:'auto'}} />
			<div className="container">
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

export default About;
