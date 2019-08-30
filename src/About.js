import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default class About extends React.Component {
	render() {
		return (
			<div id="about" className="page-component first-page-component">
				<Container>
					<Col>
						<Row className="about-row">
							<Col xs={12} sm={3}>
								<img src="images/author.png" className="logo mx-auto d-block" alt="Parth Sarin" />
							</Col>
							<Col xs={12} sm={9}>
								<h2>About Me</h2>
								I am a student at Stanford University studying math and public policy. Before coming to Stanford, while I was in high school, I studied and conducted research in mathematics at Texas A&amp;M University. There, I accumulated almost fifty credits and completed the mathematics courses required for a degree in pure math. I also have extensive technical experience with programming and algorithmic design especially in <span className="text-info">machine learning</span> and <span className="text-info">data science</span>. I also have extensive legal experience and have worked as an law clerk in the Office of the State's Attorney of Cook County (Chicago, IL) and in the Office of the District Attorney of Brazos County.
							</Col>
						</Row>
				</Col>
				</Container>
			</div>
		);
	}
}