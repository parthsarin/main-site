import React from 'react';

import About from './About';
import Contact from './Contact';
import Navigation from './Navigation';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navExpanded: false
    }
  }
  render() {
    return (
      <div className="h-100 w-100">
        <Navigation />

        <About />
        <Contact />
      </div>
    );
  }
}