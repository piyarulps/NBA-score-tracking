import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { teamdetails, TeamList, TeamListDeatils } from '../Shared/api.modal';

@Component({
  selector: 'app-nba-score',
  templateUrl: './nba-score.component.html',
  styleUrls: ['./nba-score.component.scss']
})
export class NbaScoreComponent implements OnInit{
  title = 'angular15';
  public teams: TeamList[] =[];
  public selectedTeam!: TeamList;
  public seelectedAllTeam:Array<TeamListDeatils>=[]
  public ImgURl:string="https://interstate21.com/nba-logos/"
  public fileType:string ='.png';
  public teamdetails:Array<teamdetails> =[];

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
    const dateParams=this.service.getParams();
    this.service.getTeam(this.selectedTeam.id,dateParams).subscribe(res=>{
      const fetchData=this.scoreBoardData(res.data,this.selectedTeam.id);
      console.log('fetchData',fetchData);
      const teamData:any=this.selectedTeam;
      teamData.results=fetchData.results;
      teamData.selfAvgScore= (fetchData.selfAvgScore/fetchData.results.length).toFixed(2);
      teamData.opptAvgScore=(fetchData.opptAvgScore/fetchData.results.length).toFixed(2);;
      this.seelectedAllTeam.push(teamData);
      console.log(this.seelectedAllTeam);
      this.service.selectedTeamList= this.seelectedAllTeam;
    })
  
  }


  private scoreBoardData(fetchData: any, selectedId:number) {
    let totalSelfScore=0;
    let totalOpptScore=0;
    
    fetchData.map((element: any) => {
      if (element.home_team.id == selectedId) {
        element['self_score'] = element.home_team_score;
        element['selfTeam'] = element.home_team.abbreviation;
        element['oppt_score'] = element.visitor_team_score;
        element['OpptTeam'] = element.visitor_team.abbreviation;
        totalSelfScore=totalSelfScore+element.home_team_score;
        totalOpptScore=totalOpptScore +element.visitor_team_score;
        console.log(totalSelfScore,totalOpptScore);

      }
      else if (element.visitor_team.id == selectedId) {
        element['self_score'] = element.visitor_team_score;
        element['selfTeam'] = element.visitor_team.abbreviation;
        element['oppt_score'] = element.home_team_score;
        element['OpptTeam'] = element.home_team.abbreviation;
        totalSelfScore=totalSelfScore+element.visitor_team_score;
        totalOpptScore=totalOpptScore +element.home_team_score;
        console.log(totalSelfScore,totalOpptScore);

      }
    });    
    const retrunData={
      selfAvgScore:totalSelfScore,
      opptAvgScore:totalOpptScore,
      results:fetchData,
    }
    return retrunData
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
