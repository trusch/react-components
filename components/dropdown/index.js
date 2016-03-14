import React, {Component} from 'react';
import './dropdown.styl';

export default class Dropdown extends Component  {
  static propTypes = {
    id       : React.PropTypes.string,
    className: React.PropTypes.string,
    default  : React.PropTypes.string,
    offset   : React.PropTypes.number,
    options  : React.PropTypes.array,
    disabled : React.PropTypes.bool,
    error    : React.PropTypes.bool,
  };

  static defaultProps = {
    id       : null,
    className: null,
    default  : "please select",
    offset   : 10,
    options  : [],
    disabled : false,
    error    : false,
  };

  constructor(props) {
    super(props);
    this.move     = ('ontouchstart' in window) ? "touchmove" : "mousemove";
    this.end      = ('ontouchstart' in window) ? "touchend" : "mouseup";
    this.dragging = this.dragging.bind(this);
    this.dragend  = this.dragend.bind(this);
    this.options  = [];
    this.scroll   = -1;
    this.start    = 0;
    this.state    = {
      open: false,
      active: 0,
      selected: 0,
      lineHeight: 0,
    };
  }

  componentDidMount() {
    let frame  = this.refs.frame;
    let width  = frame.offsetWidth;
    let height = this.refs.option0.clientHeight;
    this.setState({lineHeight: height});
    frame.parentNode.style.width = width +'px';
  }

  getOptions() {
    let i, option;
    this.options.push({name: this.props.default, value: "default"});
    for (i=0; i<this.props.options.length; i++) {
      option = this.props.options[i];
      if (option.selected) this.setState({selected: i+1, active: i+1});
      this.options.push(option);
    }
  }

  handleOpen(state) {
    let open = (state==1) ? !this.state.open : false;
    this.setState({open: open});
    this.scroll = -1;
    this.start = 0;
  }

  selectOption(i) {
    let value = this.options[i].value;
    this.setState({selected: i, active: i});
    this.props.onChange(i, value);
  }

  scrollOptions(e) {
    let self    = this;
    let active  = this.state.active;
    this.start += e.deltaY;
    if (Math.abs(this.start)>=50) {
      active += (this.start>0) ? 1 : -1;
      active = Math.max(0, active);
      active = Math.min(this.options.length-1, active)
      this.setState({active: active});
      this.start = 0;
    }
    if (this.scroll==-1) this.scroll = active;
    
    setTimeout(function() {
      if (active==self.scroll) {
        self.selectOption(self.state.active);
        self.handleOpen(0);
      }
      self.scroll = active;
    }, 2000);
  }

  dragStart() {
    document.addEventListener(this.move, this.dragging);
    document.addEventListener(this.end , this.dragend);
  }

  dragging(e) {
    let active = this.state.active;
    let dif    = 0;
    let y      = e.clientY || e.touches[0].clientY;
    if (this.start==0) this.start = y;
    else {
      dif = this.start - y;
      if (Math.abs(dif)>this.state.lineHeight) {
        active += (dif>0) ? 1 : -1;
        active = Math.max(0, active);
        active = Math.min(this.options.length-1, active)
        this.setState({active: active});
        this.start = 0;
      }
    }
  }

  dragend(){
    document.removeEventListener(this.move, this.dragging);
    document.removeEventListener(this.end , this.dragend);
    this.selectOption(this.state.active);
    this.start = 0;
  }

  getSelectedOption(){
    let i, option, value;
    if (this.options.length==0) this.getOptions();
    for (i=0; i<this.options.length; i++) {
      option = this.options[i];
      if (this.state.selected==i) value = option.name;
    }
    return value;
  }

  generateOptions() {
    let i, option, className;
    let options = [];

    for (i=0; i<this.options.length; i++) {
      option = this.options[i];
      className  = (this.state.active==i) ? "active" : "";
      className += (this.state.selected==i) ? " selected" : "";
      options.push(<li
                     key={i}
                     ref={"option"+i}
                     className={className}
                     onClick={this.selectOption.bind(this, i)}>
                     {option.name}
                   </li>);
    }
    return options;
  }

  getClasses() {
    let offset    = this.props.offset;
    let position  = offset - this.state.active;
    let downOver  = this.options.length - this.state.active;
    let borderBot = (downOver > offset) ? " borderbottom" : "";
    let borderTop = (position <= 0)     ? " bordertop"    : "";
    let disabled  = this.props.disabled ? " disabled"     : "";
    let error     = this.props.error    ? " error"        : "";
    let open      = this.state.open     ? " open"         : "";
    let classes   = {
      dropdown: this.props.className + disabled + error,
      frame   : "dropdown-frame" + open + borderTop + borderBot,
    };
    return classes;
  }

  getStyles() {
    let offsetPix = this.props.offset * this.state.lineHeight;
    let position  = this.props.offset - this.state.active;
    let styles    = {
      options: {top: position * this.state.lineHeight + 'px'},
      frame  : {top: -offsetPix+'px', bottom: -offsetPix +'px'}
    };
    return styles;
  }

  render() {
    let selected = this.getSelectedOption();
    let options  = this.generateOptions();
    let classes  = this.getClasses();
    let styles   = this.getStyles();

    return (
      <dropdown
        tabIndex="0"
        onBlur={this.handleOpen.bind(this, 0)}
        onMouseUp={this.handleOpen.bind(this, 1)}
        className={classes.dropdown}>
        <div className="dropdown-select">
          <span className="dropdown-value">{selected}</span>
          <span className="dropdown-arrow" />
          <div className={classes.frame} ref="frame" style={styles.frame}>
            <ul
              ref="options"
              style={styles.options}
              onWheel={this.scrollOptions.bind(this)}
              onMouseDown={this.dragStart.bind(this)}
              onTouchStart={this.dragStart.bind(this)}
              onTouchEnd={this.handleOpen.bind(this, 0)}
              className="dropdown-options">{options}
            </ul>
          </div>
        </div>
      </dropdown>
    );
  }
}
