import React from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import PageBreak from './Component/PageBreak';

export default class Projects extends React.Component {
	render() {
		const projects = require('./res/projects.json');

		return (
			<div id="projects" className="page-component">
				<PageBreak icon="pencil-alt" />
				<h2 className="text-center">Projects</h2>
				<Container>
					{
						projects.map((project, i) => <ProjectCard project={project} key={i} />)
					}
				</Container>
			</div>
		);
	}
}

class ProjectCard extends React.Component {
	render() {
		const project = this.props.project;

		var details = [];
		if (project.abstract) {
			details.push(<li key={1}><span className="text-theme-dark">Abstract: </span><span dangerouslySetInnerHTML={{ __html: project.abstract }}></span></li>);
		}
		if (project.link) {
			details.push(<li key={2}><span className="text-theme-dark">Link: </span><a href={ project.link }>{ project.link }</a></li>);
		}

		const info = (
			<div>
				<h3 dangerouslySetInnerHTML={{ __html: project.title }}></h3>
				<span>{ project.status ? <span><span dangerouslySetInnerHTML={{ __html: project.status }}></span> | </span> : null } { project.date }</span>
				<br /><br />
				{ project.description ? <span dangerouslySetInnerHTML={{ __html: project.description }}></span> : null }
				{ details ? (
					<ul>
						{ details }
					</ul>
				) : null }
			</div>
		);

		let structure;
		if (project.img) {
			structure = (
				<Card.Body as={Row}>
					<Col lg={2} className="d-flex align-items-center">
						<div className="w-100 d-flex flex-column">
							<img src={ project.img } className="project-logo mx-auto d-block" alt={ project.name + ' logo' } />
							{ project.imgCaption ? <span className="text-center text-muted" dangerouslySetInnerHTML={{ __html: project.imgCaption }}></span> : null }
						</div>
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
			<Card className="info-card project-card">
				{ structure }
			</Card>
		);
	}
}