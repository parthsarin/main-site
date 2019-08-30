import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PageBreak(props) {
	return (
		<div className="mx-auto page-break">
			<span className="outer-line"></span>
			<div className="circle-border">
				<FontAwesomeIcon 
					icon={props.icon} 
					size={ props.size ? props.size : '4x' } 
					color={ props.color ? props.color : 'white' }
				/>
			</div>
			<span className="outer-line"></span>
		</div>
	);
}