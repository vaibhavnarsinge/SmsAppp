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
  doSomething() {
    if (this.isChecked == false) {
      this.isChecked = true;
    } else if (this.isChecked == true) {
      this.isChecked = false;
    }
  }

  selectedOption: any;
  selectedOptionText: any;

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
 

  quicksms!: FormGroup;

  constructor(
    private msgService: MsgServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder
  ) {}



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
  clearTextarea() {
    this.quicksms.get('mob')?.setValue(''); // Reset the value of the 'mob' form control to an empty string
  }
  calculateCharacterCount() {
    debugger
    const message = this.quicksms.controls['msg'].value;
  this.characterCount = message ? message.length : 0;
  }

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
 

  SendMsg() {
    debugger
    return this.msgService.SendMsg(this.quicksms.value).subscribe((res) => {
      console.log(res);
      alert('Message Sent Successfully');
    });
  }
}
