import { Component } from '@angular/core';
import { MsgServiceService } from '../services/msg-service.service';
import * as XLSX from 'xlsx'




@Component({
  selector: 'app-mis-report',
  templateUrl: './mis-report.component.html',
  styleUrls: ['./mis-report.component.css'],
})
export class MisReportComponent {
  // alluser: any;
  // userKeys: string[] = [];
  // user: any;
  // http: any;
  ArrayReport:any=[];


  alluser: any[] = [];
  userKeys: string[] = [];
  selectedItem: any;
  showDivsnd: boolean = false;
  showDivfirst:boolean = true;
  constructor(private msgService: MsgServiceService) {

    this.msgService.getDataInJson().subscribe((res: any) => {
        this.alluser = res;
        

        if (this.alluser && this.alluser.length > 0) {
          this.userKeys = Object.keys(this.alluser[0]);
        } else {
          console.log("No data received");
        }
        console.log(res);
        
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
    
  }
  showDetail(item: any) {
    this.selectedItem = item;
    this.showDivsnd = !this.showDivsnd;
    this.showDivfirst = false
 
  }

  backbutton() {
    this.showDivsnd = false;
    this.showDivfirst = true;
  }
  




  showTabletwo = false;
  showTableone = true;
  selectedRowData: any[]=[];
  rowData:any;
  backbtn = false

 

  
  back(){
    this.showTabletwo = false;
    this.showTableone = true;
    this.backbtn = false

  }

  getDetailedReport(rowData:any) {
    this.backbtn = true
    this.showTabletwo = true;
    this.showTableone = false;

    const mobileNumbers = rowData.MobileNo.split(',');
    const statuses = rowData.Status.split(',');

    this.selectedRowData = mobileNumbers.map((mobileNo: any, index: string | number) => ({
      date: rowData.date,
      MobileNo: mobileNo,
      senderID: rowData.senderID,
      Status: statuses[index],
    }));
  }
  

  ngOnInit(): void {
    // this.msgService.getDataInJson().subscribe((res: any) => {
      // Parse the JSON response
    //   this.ArrayReport = res;
    // })

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