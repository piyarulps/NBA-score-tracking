import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-nba-score',
  templateUrl: './nba-score.component.html',
  styleUrls: ['./nba-score.component.scss']
})
export class NbaScoreComponent {
  title = 'angular15';
  public cities: City[];
  public data:boolean=false;
  public selectedTeam: City | undefined;
  public seelectedAllTeam:Array<any>=[]


  constructor(private service:ApiService , private router:Router){
    this.getData();
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }
  trackTeam(){
    console.log(this.selectedTeam);
    this.data=true;
    this.seelectedAllTeam.push(this.selectedTeam);
    this.selectedTeam =undefined;

  }

  private getData() {
    this.service.getData().subscribe(res=>{
      console.log(res);
    })
  }
  closeTeam(index:number){
    console.log(index);
    this.seelectedAllTeam.splice(index, 1);
    console.log(this.seelectedAllTeam);
    
    
  }
  resultPage(team:any){
    console.log(team);
    this.router.navigateByUrl('/nba-team-result')

  }
}
