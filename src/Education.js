import React from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import PageBreak from './Component/PageBreak';

export default class Education extends React.Component {
	render() {
		const education = require('./res/education.json');

		return (
			<div id="education" className="page-component">
				<PageBreak icon="graduation-cap" />
				<Container>
					<h2 className="text-center">Education</h2>
					{
						education.map((inst, i) => <EducationCard institution={inst} key={i} />)
					}
				</Container>
			</div>
		);
	}
}

class EducationCard extends React.Component {
	render() {
		const inst = this.props.institution;

		const info = (
			<div>
				<h3>{ inst.name }</h3>
				<span><span className="text-theme-dark">{ inst.major }</span> | { inst.dates }</span>
				<br /><br />
				{ inst.GPA ? <span><span className="text-theme-dark">GPA:</span> {inst.GPA}<br /></span> : null }
				{ inst.coursework ? <span><span className="text-theme-dark">Relevant coursework:</span> {inst.coursework.join(', ')} <br /></span> : null }
				{ inst.description ? <span dangerouslySetInnerHTML={{ __html: inst.description }}></span> : null }
			</div>
		);

		let structure;
		if (inst.img) {
			structure = (
				<Card.Body as={Row}>
					<Col lg={2} className="d-flex align-items-center">
						<img src={inst.img} className="logo mx-auto d-block" alt={ inst.name + ' logo' } />
					</Col>
					<Col lg={10}>
						{ info }
					</Col>
				</Card.Body>
			);
		} else {
			structure = (
				<Card.Body>
					{ info }
				</Card.Body>
			);
		}

		return (
			<Card className="info-card education-card">
				{ structure }
			</Card>
		);
	}
}