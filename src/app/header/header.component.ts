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

    this.msgService.localBalanceDataa();
    this.loadCount();
  
  }



  
  loadCount(){
    
    // this.Username  = this.msgService.Username;
    this.Username = 'demotr'

    return this.msgService.GetBalance(this.Username).subscribe((res:any) => {
      if(res.Success == true){
  
        this.count = res.SMSBalance;
      }})
}



menuvisible: boolean = true;
  toggleMenu() {
    
    this.menuvisible = !this.menuvisible;
  }


  isDarkMode: boolean = false;

  toggleMode() {
    this.isDarkMode = !this.isDarkMode;
    this.updateStyles();
  }

  updateStyles() {
    if (this.isDarkMode) {
      document.documentElement.style.setProperty('--allfontcolor', 'white');
      document.documentElement.style.setProperty('--mainbgc', 'black');
      document.documentElement.style.setProperty('--headingcolor', 'white');

    } else {
      document.documentElement.style.setProperty('--allfontcolor', '#000000');
      document.documentElement.style.setProperty('--mainbgc', '#f6ffff');
      document.documentElement.style.setProperty('--headingcolor', 'rgb(0, 89, 130)');

    }
  }

  get dynamicStyles() {
    return {
      '--allfontcolor': this.isDarkMode ? 'white' : '#000000',
      '--mainbgc': this.isDarkMode ? 'black' : '#f6ffff',
      '--headingcolor': this.isDarkMode ? 'white' : 'rgb(0, 89, 130)'


    };
  }
}
