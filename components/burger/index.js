import React, { Component } from 'react';

export default class Burger extends Component {
  render() {
    return (
      <button className="burger-menu hidden-lg hidden-md">
        <span className="bar bar-1"></span>
        <span className="bar bar-2"></span>
        <span className="bar bar-3"></span>
        <span className="bar bar-4"></span>
      </button>
      )
  }
}