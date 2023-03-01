import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbaScoreComponent } from './nba-score/nba-score.component';
import { NbaTeamResultComponent } from './nba-team-result/nba-team-result.component';

const routes: Routes = [
  { path: '', component:NbaScoreComponent },
  { path: 'results/:teamCode', component:NbaTeamResultComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
