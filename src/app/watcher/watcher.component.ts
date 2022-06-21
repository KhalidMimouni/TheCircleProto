import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import FlvJs from 'flv.js';
import Hls from 'hls.js';

import { SocketserviceService } from '../socketservice.service';


@Component({
  selector: 'app-watcher',
  templateUrl: './watcher.component.html',
  styleUrls: ['./watcher.component.css']
})
export class WatcherComponent implements OnInit, AfterViewInit {

  private socketService: SocketserviceService



  private mimeCodec = 'video/webm;codecs=vp9,opus'
  private mediaSource = new MediaSource()
  public sourceBuffer?: SourceBuffer
  private queue: any[] = []
  constructor(socketService: SocketserviceService) {
    this.socketService = socketService;
  }
  ngAfterViewInit(): void {
    // this.videoPlayer.nativeElement.src = URL.createObjectURL(this.mediaSource)
  }

  ngOnInit(): void {
    this.socketService.joinStream(1)
    // this.mediaSource.addEventListener('sourceopen', () => {

    //   this.sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeCodec)
    //   this.sourceBuffer.mode = 'sequence'

    //   this.socketService.socket.on('stream', stream => {
    //     console.log('receiving stream from streamer')

    //     console.log(stream)

    //     console.log(this.sourceBuffer)
    //     var uint8array = new Int8Array(stream)
    //     this.sourceBuffer?.appendBuffer(uint8array)
    //   })
    // })

    var video = document.getElementById('videoPlayer') as HTMLVideoElement
    // var hls = new Hls()
    // console.log('trying to get hls source...')
    // hls.loadSource("http://localhost:8000/live/khalid/index.m3u8")
    // console.log('hls loaded')
    // hls.attachMedia(video)
    // hls.on(Hls.Events.MANIFEST_PARSED, function () {
    //   video.play();
    // });
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





}
