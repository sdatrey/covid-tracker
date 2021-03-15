import { Component, Input, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  @Input('totalConfirmed') 
  totalConfirmed;
  @Input('totalActive')
  totalActive;
  @Input('totalRecovered')
  totalRecovered;
  @Input('totalDeaths')
  totalDeaths;
  countries: string[] = [];
  data: GlobalDataSummary[];

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(
      res => {
        this.data = res;
        this.data.forEach(cs => {
          this.countries.push(cs.country);
        })
      }
    )
  }
  updatedValue(country: string){
    console.log(country);
    this.data.forEach(cs => {
      if(cs.country === country){
          this.totalConfirmed = cs.confirmed;
          this.totalDeaths = cs.deaths; 
          this.totalActive = cs.active;
          this.totalRecovered = cs.recovered;
          
      }
    })

  }

}
