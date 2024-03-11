import { Component } from '@angular/core';
import { MsgServiceService } from '../services/msg-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  count:any;

  currentDate: Date = new Date();
  SmsBalance:number=500;
  constructor(private msgService:MsgServiceService) { }

  ngOnInit(): void {
    //function to update time continue
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000); 

    this.msgService.localBalanceData();
  
  }


  loadCount(){
    
    this.count  = this.msgService.balanceCount;
  }
}
