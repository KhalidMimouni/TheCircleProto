import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import FlvJs from 'flv.js';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SocketserviceService } from '../socketservice.service';


@Component({
  selector: 'app-watcher',
  templateUrl: './watcher.component.html',
  styleUrls: ['./watcher.component.css']
})
export class WatcherComponent implements OnInit, AfterViewInit {
  private socketService: SocketserviceService

  chat = new FormControl('');
  
  public sourceBuffer?: SourceBuffer
  messages: string[] = []
  constructor(socketService: SocketserviceService) {
    this.socketService = socketService;
  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.socketService.joinStream(1)
    this.messages.push("Welkom chat is open")
    
    this.socketService.socket.on('chat', chat => {
      this.messages.push(chat)
      console.log(this.messages)
    })
    

    var video = document.getElementById('videoPlayer') as HTMLVideoElement
    
    var flvPlayer = FlvJs.createPlayer({
      type: 'flv',
      isLive: true,
      url: 'http://hetrondje.bogaers.org:8000/live/khalid.flv'
    })
    flvPlayer.attachMediaElement(video)
    flvPlayer.load()
    flvPlayer.play()
    console.log('playing flv stream')

    
  }

  sendchat(){
    this.messages.push(this.chat.value!)
    this.socketService.sendChat(this.chat.value!, 1)
    this.chat.setValue("")
  }
}
