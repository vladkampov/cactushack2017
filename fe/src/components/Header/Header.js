import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { NavItem } from '../';
import { uuid } from '../../utils';
import { CORE_CONNECT_DOMAIN } from '../../api/config';
import './Header.scss';

/* eslint-disable jsx-a11y/href-no-hash */
export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      access_token: localStorage.getItem('access_token')
    };
  }

  render() {
    return (
      <header className="Header">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <IndexLink to="/" className="navbar-brand">
                Band`er 
              </IndexLink>

              <ul className="nav navbar-nav">
                <NavItem to="/">username</NavItem>
                <li>
                  <a href="">Log out</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

// <ul className="nav navbar-nav">
                  //   <li>
                  //     <a href="">Login</a>
                  //   </li>
                  // </ul>