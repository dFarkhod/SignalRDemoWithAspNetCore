import { Component, OnInit, ViewChild } from '@angular/core';
import { SignalRService } from './services/signalr.service';
import { ChartModel } from './interfaces/chart.model';
import { BaseChartDirective } from 'ng2-charts';
import { formatDate } from '@angular/common';


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

  chartType: string = 'line';
  chartLegend: boolean = true;
  colors: any[] = [{ backgroundColor: 'blue', borderColor: "blue" } , { backgroundColor: 'red', borderColor: 'red' }];
  lineChartData: ChartModel[] = [];
  lineChartLabels: string[] = [];

  constructor(private signalRService: SignalRService) { }

  ngOnInit() {
    this.lineChartData = [{ data: [0], label: "MYR", fill: false },  { data: [0], label: "SGD", fill: false }];
    this.lineChartLabels = [formatDate(new Date(), 'yyyy-MM-dd', 'en')];
    this.subscribeToRatesData();
    this.signalRService.init();
  }

  private subscribeToRatesData() {
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
