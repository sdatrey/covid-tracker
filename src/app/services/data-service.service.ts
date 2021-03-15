import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-14-2021.csv`;

  constructor(private http: HttpClient) { }
  getGlobalData(){
    return this.http.get(this.globalDataUrl, {responseType: 'text'}).pipe(
      map(response => {
        let rows = response.split("\n");
        let raw = {}
        rows.splice(0,1);
        let data: GlobalDataSummary[] = [];
        rows.forEach(
          row => {
            let cols = row.split(/,(?=\S)/);
            let cs = {
              country: cols[3],
              confirmed: +cols[7],
              deaths: +cols[8],
              active: +cols[10],
              recovered: +cols[9] 
            }
            let temp: GlobalDataSummary = raw[cs.country];
            if(temp){
              temp.confirmed = cs.confirmed + temp.confirmed;
              temp.active = cs.active + temp.active;
              temp.recovered = cs.recovered + temp.recovered;
              temp.deaths = cs.deaths + temp.deaths;
              raw[cs.country] = temp;
            }
            else{
              raw[cs.country] = cs;
            }
          }
        )
        return <GlobalDataSummary[]>Object.values(raw);
      }
      )
    )
  }  
}
