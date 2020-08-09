import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default class About extends React.Component {
	render() {
		return (
			<div id="about" className="page-component first-page-component">
				<h1 className="text-center title">Parth <span className="text-theme">Sarin</span></h1>
				<Container>
					<Col>
						<Row className="about-row">
							<Col sm={12} lg={3} className="d-flex align-items-center">
								<img src="images/author.png" className="logo mx-auto d-block" alt="Parth Sarin" />
							</Col>
							<Col sm={12} lg={9}>
								<h2>About Me</h2>
								<p>I'm a student and instructor at Stanford: I study public policy and math and teach <a href="https://stanfordpython.com/">CS 41</a>, a class about the Python programming language. In the past, I've been a bartender, worked in criminal justice, and applied data science to education policy at the California Department of Education.</p>

								<p>The common thread that runs through all of those experiences is that I love communicating complicated ideas to diverse audiences. I'm deeply passionate about using data to drive sensible policy decisions and believe we need more people who understand data and policy to bridge the gap between those worlds.</p>
							</Col>
						</Row>
				</Col>
				</Container>
			</div>
		);
	}
}