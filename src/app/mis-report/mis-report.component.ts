import { Component } from '@angular/core';
import { MsgServiceService } from '../services/msg-service.service';

@Component({
  selector: 'app-mis-report',
  templateUrl: './mis-report.component.html',
  styleUrls: ['./mis-report.component.css'],
})
export class MisReportComponent {
  alluser: any;
  userKeys: string[] = [];
  user: any;

  constructor(private msgService: MsgServiceService) {

    this.msgService.getDataInJson().subscribe((res: any) => {
      debugger
      this.alluser = JSON.parse(res);
      if (this.alluser.length > 0) {
        // Get keys from the first item assuming all items have the same structure
        this.userKeys = Object.keys(this.alluser[0]);
      }
      console.log(res);
    });
    
  }

  ngOnInit(): void {
    debugger;

    
  }
}































// this.msgService.getDataInJson().subscribe((res: any) => {
//   debugger
//   this.alluser = JSON.parse(res);
//   if (this.alluser.length > 0) {
//     // Get keys from the first item assuming all items have the same structure
//     this.userKeys = Object.keys(this.alluser[0]);
//   }
//   console.log(res);
// });


// const localData = localStorage.getItem('EMpData');
    // if (localData != null) {
    //   this.alluser = JSON.parse(localData);
    //   console.log(this.alluser )
    // }
    // this.user = this.alluser

    // if (this.alluser.length > 0) {
    //   // Get keys from the first item assuming all items have the same structure
    //   this.userKeys = Object.keys(this.alluser[0]);
    // }