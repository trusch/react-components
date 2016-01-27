import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import Map from '../Maps'
import './card.styl';

export default class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.list = false;
  }

  openShell() {
    var target = 'http://'+window.location.hostname+':3000/wetty/ssh/root/'+deviceName+'.vpn';
    var specs = 'width=800,height=400';
    window.open(target, deviceName, specs);
  }

  toggleVPN() {
    if(this.vpnState === 'active'){
      vpnStop().then(()=>{
        this.vpnState = 'inactive';
      });
    }else{
      vpnStart().then(()=>{
        this.vpnState = 'active';
      });
    }
  }

  getMap() {
    return "map";
  }

  vpnState(){
      return new Promise((resolve,reject)=>{
         adapter.emit('smartlogger::'+deviceName+'::vpn::status').then((evt)=>{
             if(evt.payload.hasOwnProperty('active')){
                 resolve(evt.payload.active);
             }else{
                 reject();
             }
         });
      });
  }

  vpnStart(){
      return new Promise((resolve,reject)=>{
         adapter.emit('smartlogger::'+deviceName+'::vpn::start').then((evt)=>{
             if(evt.payload.success === true){
                 resolve();
             }else{
                 reject();
             }
         });
      });
  }

  vpnStop(){
      return new Promise((resolve,reject)=>{
         adapter.emit('smartlogger::'+deviceName+'::vpn::stop').then((evt)=>{
             if(evt.payload.success === true){
                 resolve();
             }else{
                 reject();
             }
         });
      });
  }

  locationGet(){
      return new Promise((resolve,reject)=>{
         adapter.emit('smartlogger::'+deviceName+'::location::get').then((evt)=>{
             if(typeof evt.payload.location === 'string'){
                 resolve(evt.payload.location);
             }else{
                 reject();
             }
         });
      });
  }

  locationSet(location){
      return new Promise((resolve,reject)=>{
         adapter.emit('smartlogger::'+deviceName+'::location::set', {location: location}).then((evt)=>{
             if(evt.payload.success){
                 resolve();
             }else{
                 reject();
             }
         });
      });
  }

  render() {
    //console.log('card detail', this.props);
    let map;
    if(this.props.card.longitude && this.props.card.latitude) {
      map = <map>{this.getMap()}</map>;
    }
    let lat = 40.790296;
    let lon = -73.959496;
    let location = 'Paris';

    let sm = this.list === true ? 12 : 6;
    let md = this.list === true ? 12 : 4;
    let lg = this.list === true ? 12 : 3;

    let listClass = "enermon-card "+(this.list === true ? 'list-view' : '')
    return (
      <Col xs={12} sm={sm} md={md} lg={lg}>
        <card className={listClass}>
          <div className="map-container">
            <Map lat={lat} lon={lon} location={location}/>
          </div>
          <div className="map-info-container">
            <h2> {this.props.card.name+''+this.props.cardid}</h2>
            <h3>{location}</h3>
            <button className="btn-shell" onClick={this.openShell.bind(this)}>Shell</button>
            <button className="btn-vpn" onClick={this.toggleVPN.bind(this)}>VPN</button>
          </div>
        </card>
      </Col>
    );
  }
}
