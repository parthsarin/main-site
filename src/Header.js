import React from 'react';

export default class Header extends React.Component {
	render () {
		return (
			<div className="page-header">
				<h1>Parth <span className="text-primary">Sarin</span></h1>
				<p>I am a student studying <span class="text-primary">mathematics</span> and <span class="text-primary">public policy</span> at Stanford University. My research is in <span class="text-primary">applied algebraic geometry</span> with applications in <span class="text-primary">data science</span> and <span class="text-primary">machine learning</span>.</p>
			</div>
		);
	}
}