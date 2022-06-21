import { Component, OnInit } from '@angular/core';
import {Stream} from '../models/stream.model'
import { StreamserviceService } from '../streamservice.service';
@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  streams: Stream[] = []
  streamservice? : StreamserviceService
  constructor(streamserviceService : StreamserviceService) { 
    this.streamservice = streamserviceService
  }

  ngOnInit(): void {
    
    var stream  = new Stream();
    stream.Id = 1
    this.streams.push(stream)
    // this.streamservice?.getRecomendedStreams().subscribe((streams) => {
    //   this.streams = streams
    // })
  }
}
