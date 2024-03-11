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



  balanceCount:any= 100;

  localBalanceData(){
    this.balanceCount = (localStorage.getItem('count') || 100);
    return
  }
}
