import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  currentDate: Date = new Date();


  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000); // Update every second
  }
}
