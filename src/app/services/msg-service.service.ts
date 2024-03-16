import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MsgServiceService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient, private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type, Accept, Authorization, X-Request-With',
      preflightContinue: 'false',
    }),
  };

  SendMsg(data: any) {
    return this.http.get(
      'http://api.sms123.in/api/QuickSend/QuickSend?username=' +data.username +'&password=' + data.password + '&mob=' +
        data.mob +'&msg=' +data.msg +'&sender=' +data.sender + '&templateid=' +data.templateid +
        '&coding=' + data.coding, this.httpOptions)
        .pipe(
          retry(1)
        )
  }


  GetBalance(data:any){
    
    return this.http.get(
      'http://api.sms123.in/api/Credit/Credit?username='+data, this.httpOptions)
      .pipe(
        retry(1)
      )
  }


  setDataInJson(data:any){
    return this.http.post('http://localhost:3000/report',data)
  }

  // getDataInJson(){
  //   debugger
  //   return this.http.get('http://localhost:3000/report')
  // }

  getDataInJson() {
    
    return this.http.get('http://localhost:3000/report');
  }
  




  Username:any;

  localBalanceDataa(){
    this.Username = (localStorage.getItem('Username'));
    return
  }
}
