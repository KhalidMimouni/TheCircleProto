import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChildActivationStart } from '@angular/router';
import { Chat } from '../models/chat.model';
import { SocketserviceService } from '../socketservice.service';
import { StreamserviceService } from '../streamservice.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  private localStream?: MediaStream
  private mediaRecorder?: MediaRecorder
  private streamService: StreamserviceService
  private chunks: any[] = []
  followers: number = 0
  messages: string[] = []
  private mimeCodec = 'video/webm;codecs=vp9,opus'
  chat = new FormControl('');
  @ViewChild('videoTrack') videoPlayer!: ElementRef
  private socketService: SocketserviceService

  constructor(socketService: SocketserviceService, streamService: StreamserviceService) {
    this.socketService = socketService
    this.streamService = streamService
  }

  ngOnInit(): void {
    this.messages.push("Welkom chat is open")
    this.requestAudioAndVideoFromUser();
  }

  private async requestAudioAndVideoFromUser() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    this.videoPlayer.nativeElement.srcObject = this.localStream;
    this.mediaRecorder = new MediaRecorder(this.localStream, { mimeType: this.mimeCodec })

    this.socketService.joinStream(1)
    this.socketService.socket.on('chat', chat => {
      this.messages.push(chat)
    })

    this.socketService.socket.on('viewer', viewer => {
      this.followers += viewer;
    })

    // this.mediaRecorder.start(5000)
    this.mediaRecorder.ondataavailable = e => {
      e.data.arrayBuffer().then(buffer => {
        const uint8array = new Int8Array(buffer)
        console.log(uint8array.length)
        this.socketService.emitStream(uint8array, 1, "CHECK")
      })



    }
    this.mediaRecorder.start(1000)

    setInterval(() => {
      console.log('interval wordt aangeroepen')
      this.mediaRecorder?.stop()
      this.mediaRecorder?.start()
    }, 5000);
  }

  sendchat() {

    var chat = new Chat();
    chat.StreamId = 3
    chat.UserIdFrom = Number(localStorage.getItem("userId"))
    chat.UserIdTo = 3
    chat!.Message = this.chat.value!
    this.messages.push(this.chat.value!)
    this.socketService.sendChat(this.chat.value!, 1)
    this.streamService.postChat(chat)
    this.chat.setValue("")
  }
}
