import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { ApiService } from '../api.service';
import { TeamList, teamResults } from '../Shared/team.modal';

@Component({
  selector: 'app-nba-team-result',
  templateUrl: './nba-team-result.component.html',
  styleUrls: ['./nba-team-result.component.scss'],
})
export class NbaTeamResultComponent implements OnInit {
  public teamCode!: number;
  public results: Array<teamResults> = [];
  public teamdetails: TeamList | undefined;
  constructor(
    private service: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.teamCode = +params['teamCode']; // (+) converts string 'id' to a number
      this.getTeamResult(params['teamCode']);
      this.getTeamDetails(params['teamCode']);
    });
  }
  getTeamResult(teamCode: number) {
    const dateParams = this.service.getParams();
    this.service.getTeam(teamCode, dateParams).subscribe((res) => {
      this.results = res.data;
    });
  }
  getTeamDetails(teamCode: number) {
    this.service.getTeamResult(teamCode.toString()).subscribe((res) => {
      this.teamdetails = res;
    });
  }
}
