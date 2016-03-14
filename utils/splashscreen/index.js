import React, {Component} from 'react';

import './splashscreen.styl';

export default class SplashScreen extends Component {
  static propTypes = {
    loading: React.PropTypes.bool,
    //events: React.PropTypes.string,
  };

  static defaultProps = {
    timeout: 10 * 60 * 1000,
    loading: true,
    onActive: () => {},
    onIdle: () => {},
    //events: 'mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove'
  };

  constructor(props){
    super(props);
    this.state = {
      idle: true,
      loading: true
    };
  }

  createTimer() {
  }

  destroyTimer() {
    this.idleTimer.stop();
  }

  componentWillMount() {
    //this.setState({loading: false});
  }

  componentDidMount() {
    if (this.props.loading) {
      this.createTimer();
    }
    setTimeout(function() {
      this.setState({loading: false});
    }.bind(this), 2500);
  }

  componentDidUpdate() {
      //this.setState({loading: this.props.loading})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading && !this.props.loading) {
      this.createtimer();
    } else if (!nextProps.loading && this.props.loading) {
      this.destroyTimer();
    }
  }

  componentWillUnMount() {
    this.destroyTimer();
  }

  getWaitloader() {
    return(<div className="waitloader">
            <div className="contentLoader-overlay">
              <div className="contentLoader-box">
                <div className="circleG_1 circleG"></div>
                <div className="circleG_2 circleG"></div>
              </div>
            </div></div>);
  }

  render() {
    let waitloader = this.state.loading ? this.getWaitloader() : null;
    return(
      <div className={"splash-screen"+(this.state.loading ? " loading" : "")}>
        {waitloader}
        {this.props.children}
      </div>
    );
  }
}
