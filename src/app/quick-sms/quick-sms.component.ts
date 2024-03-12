import { Component } from '@angular/core';
import { MsgServiceService } from '../services/msg-service.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quick-sms',
  templateUrl: './quick-sms.component.html',
  styleUrls: ['./quick-sms.component.css'],
})
export class QuickSmsComponent {
  // selectedOption:any;
  isChecked: boolean = false;
  showFirst: boolean = true;
  showSecond: boolean = false;
  showFirstt: boolean = true;
  showSecondd: boolean = false;
  codingValue: number = 2;
  InputNo: string = '';
  validCount: number = 0;
  InvalidCount: number = 0;
  rData: any;
  rDataKey: any;
  textC: any;
  msgLength: any;
  TotalCreditChages: any;
  phoneNumber: any;
  // respArray = [];

  toggle = true;
  status = 'Enable';
  toggl = true;
  characterCount: number = 0;
  SmsBalance: number = 500;
  checkValue: any;
  quicksms!: FormGroup;
  checkedValue: number = 0;

  ngOnInit(): void {
    this.quicksms = this.formbuilder.group({
      username: ['demotr'],
      password: ['tr@1234'],
      sender: [''],
      templateid: [''],
      mob: [''],
      msg: [''],
      coding: ['1'],
    });
  }

  constructor(
    private msgService: MsgServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder
  ) {}

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }
  enableAnableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Disable' : 'Enable';
  }

  enableDisableRulee() {
    this.toggl = !this.toggl;
    this.status = this.toggl ? 'Enable' : 'Disable';
  }
  enableAnableRulee() {
    this.toggl = !this.toggl;
    this.status = this.toggl ? 'Disable' : 'Enable';
  }
  showFirstdiv() {
    this.showFirst = true;
    this.showSecond = false;
  }
  showSnddiv() {
    this.showFirst = false;
    this.showSecond = true;
  }
  showFirstdivv() {
    this.showFirstt = true;
    this.showSecondd = false;
  }
  showSnddivv() {
    this.showFirstt = false;
    this.showSecondd = true;
  }
  //function for optional showing date and time for Schedule
  doSomething() {
    if (this.isChecked == false) {
      this.isChecked = true;
    } else if (this.isChecked == true) {
      this.isChecked = false;
    }
  }

  selectedOption: any;
  selectedOptionText: any;

  //assigning template text to template Id
  updateText() {
    switch (this.selectedOption) {
      case '1707161891201501738':
        this.selectedOptionText =
          'Your My SMS verification Code id 12. Do not share this code with others Team Nuevas';
        break;
      case '1707161855199873979':
        this.selectedOptionText =
          'Dear User your OTP is 12 Kindly use OTP to validate your Registration. Team Trackzia';
        break;
      case '1707161899992775140':
        this.selectedOptionText =
          'Dear 12 , Your Complaint with Complaint Id:21 has Been Resolve Kindly Share OTP, The OTP is 43 \n From Nuevas';
        break;
    }
  }

  //clear text of Mobile Number Textarea, and count of valid and invalid count
  clearTextarea() {
    this.quicksms.get('mob')?.setValue('');
    this.InvalidCount = 0;
    this.validCount = 0;
  }



  //calculating count of characters of message
  calculateCharacterCount() {
    const message = this.quicksms.controls['msg'].value;
    this.characterCount = message ? message.length : 0;

    //this logic is used for if first msg is 160 chracter then textC = 1,
    //after that after every 140 characters textC should increase by 1
    this.msgLength = message.length;
    if (this.msgLength == 0) {
      this.textC = 0;
    } else if (this.msgLength < 160) {
      this.textC = 1;
    } else if (this.msgLength > 160 && this.msgLength < 300) {
      this.textC = 2;
    } else if (this.msgLength > 300) {
      let temp = (this.msgLength - 160) / 140;
      this.textC = Math.floor(temp) + 2;
    }
    // else{
    //   let temp  = this.msgLength/160
    //   this.textC = Math.floor(temp)+1;
    // }
    this.TotalCreditChages = this.phoneNumber.length * this.textC;
  }




  // pooGroupValue:string[] = ['9730023006,\n7028704745']
  // assigning numbers from group to mobile textarea
  UpdateTextArea(e: any) {
    if (e.target.checked == true) {
      this.quicksms.patchValue({
        mob: ['9730023006,\n7028704745'],
      });
    } else if (e.target.checked == false) {
      this.quicksms.patchValue({
        mob: '',
      });
    }
    // this.quicksms.get(this.pooGroupValue)?.setValue(this.quicksms.controls['mob'])
    // const displayArray = this.quicksms.get'displayArray'].value;
    // if(displayArray){

    // }
  }

  //counting number of phones entered in Phone no TextArea
  updateCount() {
    this.phoneNumber = this.quicksms.controls['mob'].value
      .split(',')
      .map((number: any) => number.trim());

    this.validCount = 0;
    this.InvalidCount = 0;
    this.phoneNumber.forEach((number: any) => {
      if (number.length === 10 && /^\d+$/.test(number)) {
        this.validCount++;
      } else {
        this.InvalidCount++;
      }
    });

    // this.phoneNumber = this.InputNo.split('\n').map((number) => number.trim());
    // let NumSet = new Set<string>(this.phoneNumber);

    // const numArray = Array.from(NumSet); // Convert the Set to an array
    // const lastNumber = numArray[numArray.length - 1]; // Access the last element of the array

    // if (this.ValidNumbers(lastNumber)) {
    //   this.validCount++;
    // } else {
    //   this.InvalidCount++;
    // }

    // for(let number of NumSet){
    //   if(this.ValidNumbers(number)){
    //     this.validCount++;
    //   }
    //   else if(!this.ValidNumbers(number)){
    //     this.InvalidCount ++;
    //   }
    // }
  }

  // ValidNumbers(lastNumber: any): boolean {
  //   if (lastNumber.length == 10) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  hidediv1: boolean = true;

  hideDiv1() {
    this.hidediv1 != this.hidediv1;
  }

  SendMsg() {
    debugger

    let myArray:any[] = [];
    return this.msgService.SendMsg(this.quicksms.value).subscribe((res: any) => {
        if (res.Success == true) 
        {
          alert('Message Sent Successfully');

          myArray.push(res);
          localStorage.setItem('EMpData',JSON.stringify(myArray));

          this.msgService.Username = this.quicksms.value.username;
          localStorage.setItem('Username', this.msgService.Username);
        }
//         this.rData = JSON.stringify(res);
// debugger
// console.log(res.Success);
//         console.log(this.rData[0])
//         this.rData = res;
        // this.rData = res;;

        //           // Get keys from the first item assuming all items have the same structure
        //           this.rDataKey = Object.keys(this.rData[0]);

        console.log(res);
      });
  }
}
