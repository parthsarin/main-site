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
								I am a student at Stanford University studying math and public policy. Before coming to Stanford, while I was in high school, I studied and conducted research in mathematics at Texas A&amp;M University. There, I accumulated almost fifty credits and completed the mathematics courses required for a degree in pure math. I also have extensive technical experience with programming and algorithmic design especially in <span className="text-theme-dark">machine learning</span> and <span className="text-theme-dark">data science</span>. I also have legal experience and have worked as an law clerk in the Office of the State's Attorney of Cook County (Chicago, IL) and in the Office of the District Attorney of Brazos County.
							</Col>
						</Row>
				</Col>
				</Container>
			</div>
		);
	}
}