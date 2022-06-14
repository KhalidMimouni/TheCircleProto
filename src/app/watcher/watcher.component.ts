import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SocketserviceService } from '../socketservice.service';


@Component({
  selector: 'app-watcher',
  templateUrl: './watcher.component.html',
  styleUrls: ['./watcher.component.css']
})
export class WatcherComponent implements OnInit, AfterViewInit {

  private socketService: SocketserviceService
  @ViewChild('videoPlayer') videoPlayer!: ElementRef

  
  private mimeCodec = 'video/webm;codecs=vp9,opus'
  private mediaSource = new MediaSource()
  private sourceBuffer?: SourceBuffer
  private queue: any[] = []
  constructor(socketService: SocketserviceService) {
    this.socketService = socketService;
   }
  ngAfterViewInit(): void {
    this.videoPlayer.nativeElement.src = URL.createObjectURL(this.mediaSource)
  }

  ngOnInit(): void {
    this.socketService.joinStream(1)
    this.mediaSource.addEventListener('sourceopen', () => {
      
      this.sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeCodec)
      this.sourceBuffer.mode = 'sequence'
      
      this.socketService.socket.on('stream', stream => {
        console.log('receiving stream from streamer')
        console.log(MediaSource.isTypeSupported('video/webm;codecs=vp9,opus'))
        console.log(stream)
  
        console.log(this.sourceBuffer)
        
        this.sourceBuffer?.appendBuffer(stream)
        
        
      })
    })
    
    
    // this.socketService.socket.on('stream', stream => {
    //   console.log('receiving stream from streamer')
    //   console.log(stream)

    //   console.log(this.sourceBuffer)
    //   this.sourceBuffer?.appendBuffer(stream)
      
    //   // const blob = new Blob([stream], {type: "video/x-matroska;codecs=avc1,opus"})
      
    //   // this.videoPlayer.nativeElement.src = URL.createObjectURL(blob)
    // })
    
  }
  
  
  

}
