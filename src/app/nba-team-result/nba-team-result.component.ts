import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-nba-team-result',
  templateUrl: './nba-team-result.component.html',
  styleUrls: ['./nba-team-result.component.scss']
})
export class NbaTeamResultComponent implements OnInit, OnDestroy{
  scoreList:any;
  private sub: any;
  public teamCode!: number;
  constructor(private service:ApiService, private router:Router,
    private route: ActivatedRoute){
    
    
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.sub = this.route.params.subscribe(params => {
      this.teamCode = +params['teamCode']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      console.log(this.teamCode);
      
   });
    
  }
  Back(){
    this.router.navigateByUrl('/')

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
