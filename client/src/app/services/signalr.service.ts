import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { BehaviorSubject, Subject } from 'rxjs';
import { CurrencyModel } from '../interfaces/currency.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public chartsSubject$ = new Subject<CurrencyModel[]>();
  private hubConnection: signalR.HubConnection

  public init = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/rates',
        {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection has been established!'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection
      .on('sendrates', (newData: CurrencyModel[]) => {
          this.chartsSubject$.next(newData);
          console.log(newData);
    });

  }
}
