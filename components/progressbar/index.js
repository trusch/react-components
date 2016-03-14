import React, {Component} from 'react';

import './progressbar.styl';

export default class ProgressBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      percent: this.props.percent ? this.props.percent : 0,
      percentChanged: false
    };
  }

  render() {
    let style   = ({width: this.props.percent+"%"});
    let classes = 'progress-bar-wrapper';

    if(this.props.percent == 100) classes += ' unload';
    else if(this.props.percent > 0 && this.props.percent < 100) classes += ' loading';

    return (
      <progressbar>
        <div className={classes}>
          <div style={style}/>
        </div>
      </progressbar>
    );
  }
}
