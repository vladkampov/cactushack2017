import React, { Component } from 'react';
import { IndexLink, browserHistory } from 'react-router';
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

  handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem('access_token');
    browserHistory.push('/');
    window.location.replace('//localhost')
  }

  render() {
    return (
      <header className="Header">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <IndexLink to="/" className="navbar-brand">
                  <img src="/bender.png" alt="" /> bander
              </IndexLink>

              {this.props.token ? (
                <ul className="nav navbar-nav">
                  <NavItem to={`/user/${this.props.username}`}>{this.props.username}</NavItem>
                  <li>
                    <a href="" onClick={this.handleLogout}><i className="fa fa-sign-out" aria-hidden="true" /></a>
                  </li>
                </ul>
              ) : (
                <ul className="nav navbar-nav">
                  <NavItem to="/login">Log in <i className="fa fa-sign-in" aria-hidden="true" /></NavItem>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
