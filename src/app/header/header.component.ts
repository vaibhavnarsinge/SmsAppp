import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  currentDate: Date = new Date();
  SmsBalance:number=500;
  constructor() { }

  ngOnInit(): void {
    //function to update time continue
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000); 
  }
}
