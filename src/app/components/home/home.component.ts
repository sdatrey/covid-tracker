import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  caseType: string;
  cases: string[] = ['Active', 'Confirmed', 'Recovered', 'Deaths'];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  constructor(private dataservice: DataServiceService) { }
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  };
  columnChart: GoogleChartInterface = {
    chartType:'ColumnChart'
  }

  initChart(caseType: string): void {
    let dataTable = [];
    dataTable.push(['Country', 'Cases'])
    this.globalData.forEach(cs => {
      let value: number;
      if(caseType === "Active"){
        value = cs.active
      }
      if(caseType === "Recovered"){
        value = cs.recovered
      }
      if(caseType === "Confirmed"){
        value = cs.confirmed
      }
      if(caseType === "Deaths"){
        value = cs.deaths
      }
      dataTable.push([
        cs.country, value
      ])
    })
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: {
        height: 500,
        width: 720
      }
    }
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: dataTable,
      options: {
        height: 400,
        width: 720
      }
    }
  }

  ngOnInit(): void {
    this.dataservice.getGlobalData().subscribe({
      next: (data) => {
        this.globalData = data;
        data.forEach(cs => {
          if(!Number.isNaN(cs.confirmed)){
          this.totalConfirmed+= cs.confirmed;
          this.totalActive+= cs.active;
          this.totalDeaths+= cs.deaths;
          this.totalRecovered+= cs.recovered; 
          }

        })
        this.initChart("Confirmed");
      }
    })
  }
  updateChart(value: string){
    this.initChart(value);
    
  }

}
