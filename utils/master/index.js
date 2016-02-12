import React, {Component} from 'react';
import { Grid, Row, Col } from '../../components/grid';
import Cards              from '../../utils/cards';
import './master.styl';

export default class Master extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <master>
        <div>
          <Cards title="" onCardClick={this.props.onItemClick} detailopen={this.props.detailopen}/>
        </div>
      </master>
    );
  }
}
