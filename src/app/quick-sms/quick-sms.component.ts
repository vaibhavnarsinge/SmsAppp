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
  res:any;

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
  }



  //counting number of phones entered in Phone no TextArea
  updateCount() {
    debugger;
    let phoneNumber = this.InputNo.split('\n').map((number) => number.trim());
    let NumSet = new Set<string>(phoneNumber);

    const numArray = Array.from(NumSet); // Convert the Set to an array
    const lastNumber = numArray[numArray.length - 1]; // Access the last element of the array

    if (this.ValidNumbers(lastNumber)) {
      this.validCount++;
    } else {
      this.InvalidCount++;
    }

    // for(let number of NumSet){
    //   if(this.ValidNumbers(number)){
    //     this.validCount++;
    //   }
    //   else if(!this.ValidNumbers(number)){
    //     this.InvalidCount ++;
    //   }
    // }
  }

  ValidNumbers(numb: any): boolean {
    if (numb.length == 10) {
      return true;
    } else {
      return false;
    }
  }
  hidediv1: boolean = true;

  hideDiv1() {
    this.hidediv1 != this.hidediv1;
  }

  SendMsg() {
    debugger
    return this.msgService.SendMsg(this.quicksms.value).subscribe((res) => {
      console.log(res);
      alert(JSON.stringify(res));

      if (res == true) {
        alert('Message Sent Successfully');
        this.SmsBalance = this.SmsBalance - 1;
        console.log('sms balance : ' + this.SmsBalance);
      }
      this.res = JSON.stringify(res);
      console.log(this.res.Success);

    });
  }

  // {"Success":true,"ErrorCode":"000",
  // "Message":"SMS Sent Successfully",
  // "MobileNo":"7028704745","Status":"Submited"}
}
