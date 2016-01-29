import React, { Component } from 'react';
import Image from '../../components/image/index.js';
import { Col, Grid, Row } from 'react-bootstrap';

import auth from '../../factory/auth';

import './login.styl';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  login(){
      this.props.onLogin();
  }

  handleSubmitOnKeyup(event) {
    if(event.which == 13) {
      this.handleSubmit(event);
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    const user = this.refs.user.value
    const pass = this.refs.password.value

    if(user == '') {
      this.refs.user.className  += ' error';
      this.refs.user.placeholder = 'Username missing';
    }
    if(pass == '') {
      this.refs.password.className  += ' error';
      this.refs.password.placeholder = 'Password missing';
    }

    if(user !== '' && pass !== '') {
      auth.login(user, pass, (loggedIn) => {
        if (!loggedIn) {
          this.refs.user.className  += ' error';
          this.refs.password.className  += ' error';
          return this.setState({ error: true })
        } else {
          this.props.onLogin();
        }
      })
    }
  }

  render() {
    let errortext, styling, classes, errormessage;
    if(this.state.error === true) {
      errortext = "Your credentials weren't valid. Please try again!";
      classes = "error-messsage";
      errormessage = <errorMessage className={classes} style={styling}>{errortext}</errorMessage>;
    }
    return (
      <Grid>
        <Row>
          <Col>
            <login>
              <Image src='src/images/energy-logo.svg'/>
              <input type='text' id='username' ref="user" placeholder="Username" onKeyUp={this.handleSubmitOnKeyup.bind(this)}/>
              <input type='password' id='password' ref="password" placeholder="Password" onKeyUp={this.handleSubmitOnKeyup.bind(this)}/>
              <button onClick={this.handleSubmit.bind(this)}>login</button>
              {errormessage}
            </login>
          </Col>
        </Row>
      </Grid>
    );
  }
}
