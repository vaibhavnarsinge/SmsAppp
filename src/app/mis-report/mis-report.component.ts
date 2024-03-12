import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-report',
  templateUrl: './mis-report.component.html',
  styleUrls: ['./mis-report.component.css']
})
export class MisReportComponent {

  alluser: any;

  ngOnInit(): void {
debugger

    const localData = localStorage.getItem('EMpData');
    if (localData != null) {
      this.alluser = JSON.parse(localData);
      console.log(this.alluser )
    }
  }
  

 



}

