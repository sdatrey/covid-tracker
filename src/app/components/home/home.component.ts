import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  constructor(private dataservice: DataServiceService) { }

  ngOnInit(): void {
    this.dataservice.getGlobalData().subscribe({
      next: (data) => {
        console.log(data)
        this.globalData = data;
        data.forEach(cs => {
          if(!Number.isNaN(cs.confirmed)){
          this.totalConfirmed+= cs.confirmed;
          this.totalActive+= cs.active;
          this.totalDeaths+= cs.deaths;
          this.totalRecovered+= cs.recovered; 
          }

        })
      }
    })
  }

}
