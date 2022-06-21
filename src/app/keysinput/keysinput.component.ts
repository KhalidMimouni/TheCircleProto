import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-keysinput',
  templateUrl: './keysinput.component.html',
  styleUrls: ['./keysinput.component.css']
})
export class KeysinputComponent implements OnInit {

  userId = new FormControl('');
  privkey = new FormControl('');
  constructor() { }

  ngOnInit(): void {
  }

  savekeys(){
    localStorage.setItem('privkey', this.privkey.value)
    localStorage.setItem('userId', this.userId.value)
  }

}
