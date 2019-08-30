import React from 'react';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';

import PageBreak from './Component/PageBreak';

export default class Skills extends React.Component {
	render() {
		const skills = require('./res/skills.json');

		return (
			<div id="skills" className="page-component">
				<PageBreak icon="chess" />
				<Container>
					<h2 className="text-center">Skills</h2>
					<h3>Technical skills:</h3><br />
					<Table>
						<thead>
							<tr>
								<th scope="col" style={{width: "20%"}}>Skill</th>
								<th style={{width: "80%"}}>Proficiency</th>
							</tr>
						</thead>
						<tbody>
						{
							skills.map((skill, i) => (
								<tr key={i}>
									<td>{skill.name}</td>
									<td><ProgressBar now={skill.knowledge * 10} variant={ skill.knowledge > 7 ? 'success' : 'warning' } /></td>
								</tr>
							))
						}
						</tbody>
					</Table><br />
					<h3>Languages:</h3><br />
					<Table>
						<thead>
							<tr>
								<th scope="col" style={{width: "20%"}}>Language</th>
								<th style={{width: "80%"}}>Proficiency</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>English</td>
								<td>Native language</td>
							</tr>
							<tr>
								<td>Hindi</td>
								<td>Limited working proficiency</td>
							</tr>
							<tr>
								<td>Spanish</td>
								<td>Limited working proficiency</td>
							</tr>
						</tbody>
					</Table>
				</Container>
			</div>
		);
	}
}