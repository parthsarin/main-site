import React from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import PageBreak from './Component/PageBreak';

export default class Work extends React.Component {
	render() {
		const work = require('./res/work.json');

		return (
			<div id="work" className="page-component">
				<PageBreak icon="briefcase" />
				<h2 className="text-center">Work Experience</h2>
				<Container>
					{
						work.map((inst, i) => <WorkCard institution={inst} key={i} />)
					}
				</Container>
			</div>
		);
	}
}

class WorkCard extends React.Component {
	render() {
		const inst = this.props.institution;

		const info = (
			<div>
				<h3>{ inst.title }</h3>
				<span><span className="text-info">{ inst.company }</span> | { inst.location } | { inst.dates }</span>
				<br /><br />
				{ inst.tasks ? (
					<ul>
						{ inst.tasks.map((task, i) => <li key={i}>{task}</li>) }
					</ul>
				) : null }
				{ inst.description ? <span dangerouslySetInnerHTML={{ __html: inst.description }}></span> : null }
			</div>
		);

		let structure;
		if (inst.img) {
			structure = (
				<Card.Body as={Row}>
					<Col md={2} className="d-flex align-items-center">
						<img src={inst.img} className="logo mx-auto d-block" alt={ inst.name + ' logo' } />
					</Col>
					<Col md={10}>
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
			<Card className="info-card work-card">
				{ structure }
			</Card>
		);
	}
}