import React from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import PageBreak from './Component/PageBreak';

export default class Skills extends React.Component {
	render() {
		return (
			<div id="contact" className="page-component last-page-component">
				<PageBreak icon="envelope" />
				<Container>
					<h2 className="text-center">Contact Me</h2>
					<Form action="https://formspree.io/contact@parthsarin.com" method="POST">
						<Form.Group>
							<Form.Label>Name: </Form.Label>
							<Form.Control type="text" name="name" placeholder="John Smith" />
						</Form.Group>
						<Form.Group>
							<Form.Label>Email: </Form.Label>
							<Form.Control type="email" name="email" placeholder="jsmith@gmail.com" />
						</Form.Group>
						<Form.Group>
							<Form.Label>Name: </Form.Label>
							<Form.Control as="textarea" rows="4" name="message" placeholder="Enter your message" />
						</Form.Group>
						<Button variant="info" type="submit">Submit</Button>
					</Form>
				</Container>
			</div>
		);
	}
}