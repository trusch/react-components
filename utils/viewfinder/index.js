import React, {Component} from 'react';
import './viewfinder.styl';

export default class Viewfinder extends Component {

  constructor(props) {
    super(props);
    this.dragging = this.dragging.bind(this);
    this.dragend  = this.dragend.bind(this);
    this.startX   = null;
    this.reset    = 0;
  }

  componentDidMount() {
    this.maxX = this.refs.viewfinder.offsetWidth;
    this.resetHandles();
  }

  componentDidUpdate() {
    if (this.props.reset===this.reset) return;
    this.reset = this.props.reset;
    this.resetHandles();
  }
  
  resetHandles() {
    this.stepsize = this.maxX/(this.props.selectorValue-1);
    this.refs.handleLeft.style.right = this.maxX +'px';
    this.refs.handleRight.style.left = this.maxX +'px';
  }

  moveLeftHandle(evt) {
    this.dragstart(evt.type, 'left');
  }
  
  moveRightHandle(evt) {
    this.dragstart(evt.type, 'right');
  }

  dragstart(type, position) {
    this.move     = (type==="mousedown") ? "mousemove": "touchmove";
    this.end      = (type==="mousedown") ? "mouseup"  : "touchend";
    this.position = position;
    this.opposite = (position==='left') ? 'right' : 'left';
    this.sibling  = (position==='left') ? this.refs.handleRight : this.refs.handleLeft;
    this.handle   = (position==='left') ? this.refs.handleLeft  : this.refs.handleRight;
    this.factor   = (position==='left') ? -1 : 1;    
    document.addEventListener(this.move, this.dragging);
    document.addEventListener(this.end, this.dragend);
  }

  dragend() {
    document.removeEventListener(this.move, this.dragging);
    document.removeEventListener(this.end, this.dragend);
    this.startX  = null;
    this.handleX = parseInt(this.handle.style[this.opposite]);
    let snapX    = this.findNextSnappingPoint(this.handleX);
    let section  = this.getSection();
    this.handle.style[this.opposite] = snapX + 'px';
    this.props.updateSection(section);
  }

  dragging(event) {
    let currentX = event.clientX || event.changedTouches[0].clientX;
    
    if (this.startX===null) {
      console.log('set startX');
      this.startX = currentX;
      this.handleX = parseInt(this.handle.style[this.opposite]);
      this.siblingX = parseInt(this.sibling.style[this.position]);
    }
    
    let x = this.handleX + (currentX - this.startX) * this.factor;
    x = Math.min(x, this.maxX);
    x = Math.max(x, this.maxX - this.siblingX);
    this.handle.style[this.opposite] = x + 'px';
  }

  findNextSnappingPoint(x) {
    let position = (this.position==='left') ? this.maxX-x : x;
    let offset = position%this.stepsize;
    if (offset > this.stepsize/2) offset -= this.stepsize;
    x -= offset*this.factor;
    return x;
  }

  getSection() {
    let handleLeftPos = this.maxX - parseInt(this.refs.handleLeft.style.right);
    let handleRightPos = this.maxX - parseInt(this.refs.handleRight.style.left);
    let handleLeftSteps = parseInt(handleLeftPos/this.stepsize);
    let handleRightSteps = parseInt(handleRightPos/this.stepsize);
    return {from: handleLeftSteps, to: handleRightSteps};
  }

  render() {
    //console.log('render viewfinder', this.props.selectorValue);
    let moveLeft       = this.moveLeftHandle.bind(this),
        moveRight      = this.moveRightHandle.bind(this),
        snappingpoints = [];
    
    for (let i=0; i<this.props.selectorValue-2; i++) {
      snappingpoints.push(<span className="snap" key={i} style={{width: this.stepsize+'px'}}></span>);
    }

    return (
      <div ref="viewfinder" className="viewfinder">
        {this.props.chartOverview}
        <div className="snappingpoints">{snappingpoints}</div>
        <div ref="handleLeft"  className="handle left"  onTouchStart={moveLeft}  onMouseDown={moveLeft}></div>
        <div ref="handleRight" className="handle right" onTouchStart={moveRight} onMouseDown={moveRight}></div>
      </div>
    );
  }
}