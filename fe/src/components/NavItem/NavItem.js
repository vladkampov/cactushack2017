import React from 'react';
import { Link } from 'react-router';

export default function NavItem(props, context) {
	const isActive = context.router.isActive(props.to);
	return (
		<li className={isActive ? 'active' : ''}>
			<Link {...props}>{props.children}</Link>
		</li>
	);
}

NavItem.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
