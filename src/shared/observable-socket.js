import {Observable} from "rxjs";

export class ObservableSocket {
  constructor(socket) {
    this._socket = socket;
  }

  //----------------
  // Basic Wrappers
  on$(event) {
    return Observable.fromEvent(this._socket, event);
  }

  on(event, callback) {
    this._socket.on(event, callback);
  }

  off(event, callback) {
    this._socket.off(event, callback);
  }

  emit(event, arg) {
    this._socket.emit(event, arg);
  }

}
