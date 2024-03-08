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

  toggle = true;
  status = 'Enable';
  toggl = true;
  characterCount: number = 0;
  SmsBalance: number = 500;

  quicksms!: FormGroup;

  ngOnInit(): void {
    var vall = this.isUnicode();
    this.quicksms = this.formbuilder.group({
      username: ['demotr'],
      password: ['tr@1234'],
      sender: [''],
      templateid: [''],
      mob: [''],
      msg: [''],
      coding:vall
    });
  }

  constructor(
    private msgService: MsgServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder
  ) { }
  
  

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
        this.selectedOptionText = 'Your My SMS verification Code id 12. Do not share this code with others Team Nuevas';
        break;
      case '1707161855199873979':
        this.selectedOptionText = 'Dear User your OTP is 12 Kindly use OTP to validate your Registration. Team Trackzia';
        break;
      case '1707161899992775140':
        this.selectedOptionText = 'Dear 12 , Your Complaint with Complaint Id:21 has Been Resolve Kindly Share OTP, The OTP is 43 \n From Nuevas';
        break;
    }
  }
 
  //clear text of Mobile Number Textarea
  clearTextarea() {
    this.quicksms.get('mob')?.setValue(''); 
  }
  //calculating count of characters of message
  calculateCharacterCount() {
  const message = this.quicksms.controls['msg'].value;
  this.characterCount = message ? message.length : 0;
  }
  //checking checkbox of Unicode
  isUnicode(){
    if(this.isChecked){
      return 2;
    }
    else if(!this.isChecked){
      return 1;
    }
    else{
      return 3;
    }
  }
 
  InputNo:string='';
  validCount:number=0;
  InvalidCount:number=0;

  //counting number of phones entered in Phone no TextArea
updateCount(){
  let phoneNumber = this.InputNo.split('\r\n').map(number => number.trim());
  let NumSet = new Set<string>(phoneNumber);

  for(let number of NumSet){
    if(this.ValidNumbers(number)){
      this.validCount++;
    }
    else if(!this.ValidNumbers(number)){
      this.InvalidCount ++;
    }
  }
}

ValidNumbers(numb:any):boolean{
  if(numb.length == 10){
    return true;
  }
  else{
    return false;
  }
}
hidediv1:boolean=true;

hideDiv1(){
  this.hidediv1!=this.hidediv1

}


  SendMsg() {
    return this.msgService.SendMsg(this.quicksms.value).subscribe((res) => {
      console.log(res);

      alert('Message Sent Successfully');
      // if(res.Success == true){
        this.SmsBalance = this.SmsBalance - 1;
        console.log("sms balance : "+this.SmsBalance)
      // }
    });
  }
}
