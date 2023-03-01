import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-nba-team-result',
  templateUrl: './nba-team-result.component.html',
  styleUrls: ['./nba-team-result.component.scss']
})
export class NbaTeamResultComponent implements OnInit{
  scoreList:any;
  constructor(private service:ApiService, private router:Router){
    
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    
  }
  Back(){
    this.router.navigateByUrl('/')

  }

}
