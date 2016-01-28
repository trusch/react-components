import React from 'react';
import ReactList from 'react-list';

import style from './index.styl';

export default class List extends React.Component {
  static propTypes = {
    itemRenderer: React.PropTypes.func,
    length: React.PropTypes.number,
  };

  render() {
    return (
      <list>
        <div className={style.listcontainer}>
          <ReactList itemRenderer={this.props.itemRenderer} length={this.props.length} type="variable" / >
        </div>
      </list>
    );
  }
}
