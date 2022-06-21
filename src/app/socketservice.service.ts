import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketserviceService {

  // socket = io('http://hetrondje.bogaers.org:4000/')
  socket = io('http://hetrondje.bogaers.org:4000')

  constructor() { }

  public joinStream(roomId: any){
    this.socket.emit('viewer-join', roomId)
  }

  public emitStream(stream: any, roomId: any, signature: any){
    this.socket.emit('host-streaming', {stream: stream, roomId: roomId, signature: signature})
  }

  public joinChat(roomId : any){
    this.socket.emit('join-chat', roomId)
  }

  public sendChat(message : String, roomId : any){
    this.socket.emit('send-chat', {chat: message, roomId : roomId})
  }

  public leaveSession(roomId : any){
    this.socket.emit('leave-session', roomId)
  }
}
