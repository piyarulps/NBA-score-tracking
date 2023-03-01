import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { TeamList } from '../Shared/api.modal';

@Component({
  selector: 'app-nba-score',
  templateUrl: './nba-score.component.html',
  styleUrls: ['./nba-score.component.scss']
})
export class NbaScoreComponent implements OnInit{
  title = 'angular15';
  public teams: TeamList[] =[];
  public selectedTeam!: TeamList;
  public seelectedAllTeam:Array<TeamList>=[]
  public ImgURl:string="https://interstate21.com/nba-logos/"
  public fileType:string ='.png';

  constructor(private service:ApiService , private router:Router){
    this.getData();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.seelectedAllTeam =this.service.selectedTeamList;
    console.log(this.service.selectedTeamList);
    console.log(this.seelectedAllTeam);
    
  }
  trackTeam(){
    console.log(this.selectedTeam);
    this.service.getTeam(this.selectedTeam.id).subscribe(res=>{
      console.log(res);
      
    })
    this.seelectedAllTeam.push(this.selectedTeam);
    this.service.selectedTeamList= this.seelectedAllTeam;
  }

  private getData() {
    this.service.getTeamList().subscribe(res=>{
      console.log(res.data)
      this.teams=res.data;
    })
  }
  closeTeam(index:number){
    console.log(index);
    this.seelectedAllTeam.splice(index, 1);
    console.log(this.seelectedAllTeam);
    this.service.selectedTeamList= this.seelectedAllTeam;

    
  }
  resultPage(teamCode:any){
    console.log(teamCode.id);
    this.router.navigate(['/results', teamCode.id]);

  }
}
