import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketserviceService {

  socket = io('localhost:3000')

  constructor() { }

  public joinStream(roomId: any){
    this.socket.emit('viewer-join', roomId)
  }

  public emitStream(stream: any, roomId: any){
    this.socket.emit('host-streaming', {stream: stream, roomId: roomId})
  }


}
