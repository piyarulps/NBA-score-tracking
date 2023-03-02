import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TeamList, TeamListDeatils } from './Shared/api.modal';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public selectedTeamList: Array < TeamListDeatils >= [];
  private URL =environment.apiUrl;

  private teamURL = `https://free-nba.p.rapidapi.com/games?page=0&&per_page=12`
  private teamCode = '';
  constructor(private http: HttpClient) {
 
  }

  getParams( ){
    var dates ='';
    for (let i = 0; i < 12; i++) {
      var date = new Date();
      date.setDate(date.getDate() - 1);
      var thatDay = date.getDate() - i; //Current Date
      date.setDate(thatDay);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date
        .getFullYear();
      let DD;
      let MM;

      if(month<10) {
          MM='0'+month;
       } 
   
       if(day<10) {
           DD='0'+day;
       }else{
        DD=day
       } 
       dates=dates +'&dates[]='+year+'-'+MM + '-' +  DD;
      
    }    
    console.log(dates)
    return dates
  }
  getTeamList(): Observable < any > {
    let url= this.URL+'/teams';
    return this.http
      .get < any > (url);
  }
  getTeam(id: number,params:string): Observable < any > {
    let url=this.URL+'/games?page=0&&per_page=12'+this.teamURL +params;
    console.log(url);
    
    let queryParams = new HttpParams();
    queryParams = queryParams.append('team_ids[]', id);
    return this.http
      .get < any > (url, {
        params: queryParams
      });
  }
  getTeamResult(id: string): Observable < any > {
    let url = this.URL+'/teams/'+ id
    return this.http
      .get < any > (url);
  }
}