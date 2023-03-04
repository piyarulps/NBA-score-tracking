import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { GlobalConst } from '../Shared/globalConst';
import { teamdetails, TeamList, TeamListDeatils } from '../Shared/team.modal';

@Component({
  selector: 'app-nba-score',
  templateUrl: './nba-score.component.html',
  styleUrls: ['./nba-score.component.scss'],
})
export class NbaScoreComponent implements OnInit {
  public teams: TeamList[] = [];
  public selectedTeam!: TeamList;
  public seelectedAllTeam: Array<TeamListDeatils> = [];
  public teamdetails: Array<teamdetails> = [];
  public ImgURl: string = GlobalConst.imgURL;
  public fileType: string = GlobalConst.fileType;
  constructor(private service: ApiService, private router: Router) {
    this.getData();
  }
  ngOnInit(): void {
    this.seelectedAllTeam = this.service.selectedTeamList;
  }

  trackTeam() {
    const dateParams = this.service.getParams();
    const treakTeamId = this.selectedTeam.id;
    const uniqueCheck: boolean = this.checkAvailability(
      this.seelectedAllTeam,
      treakTeamId
    );
    if (!uniqueCheck) {
       this.service.getTeam(treakTeamId, dateParams).subscribe((res) => {
        const fetchData = this.scoreBoardData(res.data, treakTeamId);
        const teamData: any = this.selectedTeam;
        teamData.results = fetchData.results;
        teamData.selfAvgScore = (
          fetchData.selfAvgScore / fetchData.results.length
        ).toFixed(2);
        teamData.opptAvgScore = (
          fetchData.opptAvgScore / fetchData.results.length
        ).toFixed(2);
        this.seelectedAllTeam.push(teamData);
        this.service.selectedTeamList = this.seelectedAllTeam;
      });
    }
  }

  private checkAvailability(arr: Array<TeamListDeatils>, val: number) {
    return arr.some((arrVal) => val === arrVal.id);
  }

  private scoreBoardData(fetchData: any, selectedId: number) {
    let totalSelfScore = 0;
    let totalOpptScore = 0;
    fetchData.map((element: any) => {
      if (element.home_team.id == selectedId) {
        element['self_score'] = element.home_team_score;
        element['selfTeam'] = element.home_team.abbreviation;
        element['oppt_score'] = element.visitor_team_score;
        element['OpptTeam'] = element.visitor_team.abbreviation;
        totalSelfScore = totalSelfScore + element.home_team_score;
        totalOpptScore = totalOpptScore + element.visitor_team_score;
      } else if (element.visitor_team.id == selectedId) {
        element['self_score'] = element.visitor_team_score;
        element['selfTeam'] = element.visitor_team.abbreviation;
        element['oppt_score'] = element.home_team_score;
        element['OpptTeam'] = element.home_team.abbreviation;
        totalSelfScore = totalSelfScore + element.visitor_team_score;
        totalOpptScore = totalOpptScore + element.home_team_score;
      }
    });
    const retrunData = {
      selfAvgScore: totalSelfScore,
      opptAvgScore: totalOpptScore,
      results: fetchData,
    };
    return retrunData;
  }

  private getData() {
    this.service.getTeamList().subscribe((res) => {
      this.teams = res.data;
    });
  }
  closeTeam(index: number) {
    this.seelectedAllTeam.splice(index, 1);
    this.service.selectedTeamList = this.seelectedAllTeam;
  }
  resultPage(teamCode: any) {
    this.router.navigate(['/results', teamCode.id]);
  }
}
