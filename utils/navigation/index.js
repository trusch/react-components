import React, { Component } from 'react';
import { Link } from 'react-router';
import Image from '../../components/image/index.js';
import Burger from '../../components/burger/index.js';
import { Col, Grid, Row } from 'react-bootstrap';

import auth from '../../factory/auth';

import './navigation.styl';

export default class Navigation extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {
      selected: {}
    };
    for(let idx in this.props.links){
      this.state.selected[this.props.links[idx].target] = false;
    }
    this.state.selected[this.props.links[0].target] = true;
    //this.props.globals.navi = this;
  }

  handleSelect(evt,selectedKey){
    console.log(evt,selectedKey);
    let newSelectedState = this.state.selected;
    for(let key in newSelectedState){
      newSelectedState[key] = false;
    }
    newSelectedState[selectedKey.substr(1)] = true;
    this.setState({
      selected: newSelectedState
    });
  }

  logout(){
    auth.logout(() => {
        this.props.onLogout();
    });
    //this.props.globals.app.setState({loggedIn: false});
  }

  getChildren(link) {
    let sub     = [];

    for(let i = 0; i < link.children.length; i++) {
      let child = link.children[i];
      let icon  = 'src/images/client-icons/'+child.icon;
      let badge;

      if(child.message > 0) {
        badge   = child.message;
      }

      sub.push(<li key={child.target}><a href="#">
        <span>{child.name}</span>
        <span className="news-msg">{badge}</span>
        <div className="image-box hidden-xs hidden-sm"><Image src={icon}/></div>
        </a></li>);

      if(child.hasOwnProperty('children')) {
        if(child.children.length > 0) {
          this.getChildren(child);
        }
      }

      if(i == link.children.length-1) {
        return <ul className="subnavi">{sub}</ul>;
      }
    }
  }

  generateNavigation(navigation, classname) {
    let links   = [];

    for(let i = 0; i < navigation.length; i++) {
      let submenu, link = navigation[i];

      if(link.children.length > 0) {
        submenu = this.getChildren(link);
      }
      links.push(<li className={classname} key={link.target}><a href="#">{link.name}</a>{submenu}</li>);
    //<Link to={link.target}>{link.name}</Link><
      if(i == navigation.length-1) {
        return links;
      }
    }
  }

  render() {
    let navigation = this.props.navigation;
    let classname  = this.state.open ? 'submenu-open' : '';
    let links      = this.generateNavigation(navigation, classname);
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <header>
              <a href="#">
                <Image src='src/images/energy-logo.svg'/>
              </a>
              <Burger />
            </header>
            <nav>
              <ul className="main-navi menu-open">
                {links}
              </ul>
            </nav>
          </Col>
        </Row>
      </Grid>
    )
  }
}
