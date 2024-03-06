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
  
  selectedOption:any;
  isChecked: boolean = false;
  showFirst:boolean = true;
  showSecond:boolean = false;

  toggle = true;
  status = 'Enable'; 

enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
}
enableAnableRule(){
  this.toggle = !this.toggle;
  this.status = this.toggle ? 'Disable' : 'Enable';
}
  showFirstdiv(){
    this.showFirst = true;
    this.showSecond = false;
  }

  showSnddiv(){
    this.showFirst = false;
    this.showSecond = true;
  }


  doSomething(){
    if(this.isChecked==false){
      this.isChecked =true;
    }
    else if(this.isChecked==true){
      this.isChecked = false;
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
    
      this.quicksms=this.formbuilder.group({
        username:["demotr"],
        password:["tr@1234"],
        sender:["NUEVAS"],
        templateid:["1707161891201501738"],
        mob:["9665687983"],
        msg:["Your My SMS verification Code id . Do not share this code with others Team Nuevas"],
       coding:["1"]
      });    
  }


  SendMsg(){
    return this.msgService.SendMsg(this.quicksms.value).subscribe((res)=>{
      console.log("Success");
      alert('Message Sent Successfully');
  })
}
}
