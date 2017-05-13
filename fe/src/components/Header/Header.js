import React from 'react';
import { IndexLink } from 'react-router';
import { NavItem } from '../';
import { uuid } from '../../utils';
import { CORE_CONNECT_DOMAIN } from '../../api/config';
import './Header.scss';

/* eslint-disable jsx-a11y/href-no-hash */

export default function Header({ uiStore }) {
	return (
		<header className="Header">
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-header">
						<IndexLink to="/" className="navbar-brand">
							<img alt="logo" src="logo.png" />
						</IndexLink>
					</div>
				</div>
			</nav>
		</header>
	);
}
