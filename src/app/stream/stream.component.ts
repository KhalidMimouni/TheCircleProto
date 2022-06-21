import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { SocketserviceService } from '../socketservice.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  private localStream?: MediaStream
  private mediaRecorder?: MediaRecorder
  private chunks: any[] = []
  private mimeCodec = 'video/webm;codecs=vp9,opus'
  @ViewChild('videoTrack') videoPlayer!: ElementRef
  private socketService: SocketserviceService

  constructor(socketService: SocketserviceService) {
    this.socketService = socketService
   }

  ngOnInit(): void {
    this.requestAudioAndVideoFromUser();
    
  }

  private async requestAudioAndVideoFromUser(){
    this.localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    this.videoPlayer.nativeElement.srcObject = this.localStream;
    this.mediaRecorder = new MediaRecorder(this.localStream, {mimeType: this.mimeCodec})
    
    // this.mediaRecorder.start(5000)
    this.mediaRecorder.ondataavailable = e => {
      e.data.arrayBuffer().then(buffer => {
        const uint8array = new Int8Array(buffer)
        
        this.socketService.emitStream(uint8array, 1)
      })
      
      
      
    }
    this.mediaRecorder.start(1000)
    
      // setInterval(() => {
      //   console.log('interval wordt aangeroepen')
      //   this.mediaRecorder?.stop()
      //   this.mediaRecorder?.start()
      // }, 5000);
    
    
    
    
    
    
  }



}
