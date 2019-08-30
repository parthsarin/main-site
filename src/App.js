import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import About from './About';
import Education from './Education';
import Work from './Work';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';

export default class App extends React.Component {
  render() {
    return (
      <div className="h-100 w-100">
        <Navbar expand="md" fixed="top" className="navbar-theme" variant="dark">
          <Navbar.Brand href="#about">Parth Sarin</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#education">Education</Nav.Link>
              <Nav.Link href="#work">Work</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#skills">Skills</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <About />
        <Education />
        <Work />
        <Projects />
        <Skills />
        <Contact />
      </div>
    );
  }
}