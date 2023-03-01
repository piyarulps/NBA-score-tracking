import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamList } from './Shared/api.modal';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public selectedTeamList:Array<TeamList>=[];
  private URL = 'https://free-nba.p.rapidapi.com/teams';
  private teamURL=`https://free-nba.p.rapidapi.com/games?page=0&dates[]=2022-12-12&dates[]=2022-12-11&dates[]=2022-12-10&dates[]=2022-12-09&dates[]=2022-12-08&dates[]=2022-12-07&dates[]=2022-12-06&dates[]=2022-12-05&dates[]=2022-12-04&dates[]=2022-12-03&dates[]=2022-12-02&dates[]=2022-12-01&per_page=12&`
  private teamCode='';
  constructor(private http: HttpClient) { }

  getTeamList(): Observable<any> {
    return this.http
      .get<any>(this.URL);
  }
  getTeam(id:number): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('team_ids[]', id);
    return this.http
      .get<any>(this.teamURL, { params: queryParams });
  }
}
