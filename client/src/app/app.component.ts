import { Component, OnInit, ViewChild } from '@angular/core';
import { SignalRService } from './services/signalr.service';
import { ChartModel } from './interfaces/chart.model';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public chartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public chartType: string = 'line';
  public chartLegend: boolean = true;
  public colors: any[] = [{ backgroundColor: 'blue', borderColor: "blue" } , { backgroundColor: 'red', borderColor: 'red' }]

  public lineChartData: ChartModel[] = [];

  public lineChartLabels: string[] = [];

  constructor(public signalRService: SignalRService, private http: HttpClient) { }

  ngOnInit() {
    this.lineChartData = [{ data: [0], label: "MYR", fill: false },  { data: [0], label: "SGD", fill: false }];
    this.lineChartLabels = ["START"];
    this.subscribeToRatesService();
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:5001/api/rates')
      .subscribe(res => {
        console.log(res);
      })
  }

  private subscribeToRatesService() {
    this.signalRService.chartsSubject$.subscribe(currencies => {
      currencies.forEach( currency => {
        this.lineChartData.filter(i => i.label == currency.code)[0].data.push(currency.rate);
      });
      this.lineChartLabels.push(currencies[0].time);      
      try {
        this.chart.chart.update();
      }
      catch (error) {
        console.log(error);
      }
    });
  }

}
