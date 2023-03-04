import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { APIConst } from './Shared/globalConst';
import { TeamListDeatils } from './Shared/team.modal';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public selectedTeamList: Array<TeamListDeatils> = [];
  private URL = environment.apiUrl;
  private teamUrlEndpoint: string = APIConst.games;
  private teamResultUrlEndpoint: string = APIConst.teams;
  public dates: string;
  constructor(private http: HttpClient) {}

  getParams() {
    this.dates = '';
    for (let i = 0; i < 12; i++) {
      let date = new Date();
      date.setDate(date.getDate() - 1);
      let thatDay = date.getDate() - i; //Current Date
      date.setDate(thatDay);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let DD;
      let MM;
      if (month < 10) {
        MM = '0' + month;
      }
      if (day < 10) {
        DD = '0' + day;
      } else {
        DD = day;
      }
      this.dates = this.dates + '&dates[]=' + year + '-' + MM + '-' + DD;
    }
    console.log(this.dates);
    return this.dates;
  }
  getTeamList(): Observable<any> {
    let url = this.URL + this.teamResultUrlEndpoint;
    return this.http.get<any>(url);
  }
  getTeam(id: number, params: string): Observable<any> {
    let url = this.URL + this.teamUrlEndpoint + params;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('team_ids[]', id);
    return this.http.get<any>(url, {
      params: queryParams,
    });
  }
  getTeamResult(id: string): Observable<any> {
    let url = this.URL + this.teamResultUrlEndpoint + '/' + id;
    return this.http.get<any>(url);
  }
}
