/* global window */
/* global WebSocket */
/* jshint bitwise: false */

//export defaul class Adapter

module.exports = {

  // this should init the websocket. this._host should come from the window object
  init(cb) {
    console.log('initialize Web Socket');
    this._host = window.location.host;
    this._finishCallbacks = {};
    this._callbacks = {};
    this._runaway = [];
    if(typeof cb === 'function'){
      this._runaway.push(cb);
    }
    this._ws = new WebSocket('ws://' + this._host + '/ws');
    this._ws.onclose = () => {
      console.log('websocket closed.');
    };
    this._ws.onerror = (err) => {
      console.log('WebSocket error:', err);
    };
    this._ws.onopen = () => {
      for (let i = this._runaway.length - 1; i >= 0; i--) {
        this._runaway[i]();
        this._runaway.splice(i, 1);
      }
    };
    this._ws.onmessage = (msg) => {
      let doc = msg.data;
      try {
        doc = JSON.parse(doc);
      } catch (err) {
        console.log('Object error:', msg);
        return 0;
      }
      switch (doc.type) {
        case 'ack':
          {
            console.debug('got ack',doc.data,this);
            if (this._finishCallbacks[doc.data.id] &&
              typeof this._finishCallbacks[doc.data.id].resolve === 'function') {
              console.debug('got resolve function');
              this._finishCallbacks[doc.data.id].resolve(doc.data);
            }
            delete this._finishCallbacks[doc.data.id];
            break;
          }
        case 'dismiss':
          {
            if (this._finishCallbacks[doc.data.id] &&
              typeof this._finishCallbacks[doc.data.id].reject === 'function') {
              this._finishCallbacks[doc.data.id].reject(doc.data);
            }
            delete this._finishCallbacks[doc.data.id];
            break;
          }
        case 'event':
          {
            if (this.checkIfAlreadyHandled(doc.data)) {
              break;
            }
            for (let topic in this._callbacks) {
              if (doc.data.topic.match(topic)) {
                let callbacks = this._callbacks[topic];
                for (let id of Object.keys(callbacks)) {
                  let cb = callbacks[id];
                  if(typeof cb === 'function'){
                    cb(doc.data);
                  }
                }
              }
            }
            break;
          }
        default:
          {
            console.log('default error', msg);
          }
      }
    };
  },

  checkIfAlreadyHandled(event) {
    this._ringbuff = this._ringbuff || [];
    for (let idx in this._ringbuff) {
      if (this._ringbuff[idx] === event.id) {
        return true;
      }
    }
    this._ringbuff.push(event.id);
    if (this._ringbuff.length > 1024) {
      this._ringbuff = this._ringbuff.slice(0, 1024);
    }
    return false;
  },

  _rdom() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  //this should send {type: register, data: {topic: 'mytopic'}} through the websocket
  on(topic, callback) {
    let callbacks = this._callbacks[topic];
    let id = this._rdom();
    if (callbacks === undefined) {
      this._callbacks[topic] = {};
      let msg = '{"type": "register", "data": {"topic":"' + topic + '"}}';
      if (this._ws.readyState !== 1) {
        this._runaway.push(() => {
          this._ws.send(msg);
        });
      } else {
        this._ws.send(msg);
      }
    }
    callbacks = this._callbacks[topic];
    callbacks[id] = callback;
    return id;
  },

  //this should send {type: unregister, data: {topic: 'mytopic'}} through the websocket
  off(topic, id) {
    if (this._callbacks[topic] && this._callbacks[topic][id]) {
      delete this._callbacks[topic][id];
      if (!this._callbacks[topic].length) {
        delete this._callbacks[topic];
        let msg = '{"type": "unregister", "data": {"topic":"' + topic + '"}}';
        this._ws.send(msg);
      }
      return true;
    }
    return false;
  },

  //this should send {type: publish, data: {topic: 'mytopic', payload: {some:'payload'}}} through the websocket
  emit(topic, payload) {
    console.log('emit: ', topic, payload);
    return new Promise((resolve, reject) => {
      let id = this._rdom();
      this._finishCallbacks[id] = {
        resolve, reject
      };
      let doc = {
        type: 'publish',
        data: {
          topic: topic,
          id: id,
          payload: payload
        }
      };
      let msg = JSON.stringify(doc);
      if (this._ws.readyState !== 1) {
        this._runaway.push(() => {
          this._ws.send(msg);
        });
      } else {
        this._ws.send(msg);
      }
    });
  },
}

//var adapter = new Adapter();
//adapter.init();
