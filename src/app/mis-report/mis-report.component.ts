import { Component } from '@angular/core';
import { MsgServiceService } from '../services/msg-service.service';




interface CheckboxItem {
  name: string;
  numbers: number[];
  checked: boolean;
}
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

    // this.msgService.getDataInJson().subscribe((res: any) => {
    //   debugger
    //   this.alluser = JSON.parse(res);
    //   if (this.alluser.length > 0) {
    //     // Get keys from the first item assuming all items have the same structure
    //     this.userKeys = Object.keys(this.alluser[0]);
    //   }
    //   console.log(res);
    // });

    this.msgService.getDataInJson().subscribe(
      (res: any) => {
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
    debugger;
  }





  checkboxes: CheckboxItem[] = [
    { name: 'Checkbox 1', numbers: [1, 2, 3], checked: false },
    { name: 'Checkbox 2', numbers: [4, 5, 6], checked: false },
    { name: 'Checkbox 3', numbers: [7, 8, 9], checked: false }
  ];
  textareaContent: string = '';

  updateTextArea(event: any, checkboxIndex: number) {
    this.checkboxes[checkboxIndex].checked = event.target.checked;
    this.updateTextareaContent();
  }

  updateTextareaContent() {
    let content: string = '';

    this.checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        content += checkbox.numbers.join(', ') + '\n';
      }
    });

    this.textareaContent = content;
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