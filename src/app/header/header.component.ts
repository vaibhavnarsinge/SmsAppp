import { Component } from '@angular/core';
import { MsgServiceService } from '../services/msg-service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  Username:any;
  count:any;
  currentDate: Date = new Date();
  SmsBalance:number=500;
  constructor(private msgService:MsgServiceService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //function to update time continue
    setInterval(() => {
      
      this.currentDate = new Date();
    }, 1000); 

    this.msgService.localBalanceData();
    this.loadCount();
  
  }



  
  loadCount(){
    
    this.Username  = this.msgService.Username;
    // this.Username = 'demotr'

    return this.msgService.GetBalance(this.Username).subscribe((res:any) => {
      if(res.Success == true){
  
        this.count = res.SMSBalance;
      }})
}
}
