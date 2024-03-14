import { Component } from '@angular/core';
import { MsgServiceService } from '../services/msg-service.service';
import * as XLSX from 'xlsx'




@Component({
  selector: 'app-mis-report',
  templateUrl: './mis-report.component.html',
  styleUrls: ['./mis-report.component.css'],
})
export class MisReportComponent {
  alluser: any;
  userKeys: string[] = [];
  user: any;
  http: any;
  ArrayReport:any=[];


  constructor(private msgService: MsgServiceService) {

    this.msgService.getDataInJson().subscribe((res: any) => {
        // Parse the JSON response
        this.alluser = res;
    
        // Check if data is received
        if (this.alluser && this.alluser.length > 0) {
          // Get keys from the first item assuming all items have the same structure
          this.userKeys = Object.keys(this.alluser[0]);
        } else {
          // Handle case where no data is received
          console.log("No data received");
        }
        // Log the response
        console.log(res);
      },
      (error) => {
        // Handle error
        console.error("Error fetching data:", error);
      }
    );
  }


  ngOnInit(): void {
    this.msgService.getDataInJson().subscribe((res: any) => {
      // Parse the JSON response
      this.ArrayReport = res;
    })

  }

  getReport():void{
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ArrayReport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
    XLSX.writeFile(wb,'report.xlsx');
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