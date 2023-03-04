export interface TeamList {
  id: number
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;

}
export interface TeamListDeatils{
    id: number
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
    selfAvgScore: number;
    opptAvgScore: number;
    results:Array<any>
  }

  export interface teamdetails{
    team:TeamList,
    score:Array<any>;
  
  }

  export interface teamResults {
    id	:	number;
    date	:	string;
    home_team_score	:	number;
    visitor_team_score	:	number;
    period	:	number;
    postseason	:	boolean;
    season	:	number;
    status	:	string;
    time	:	string;
    visitor_team:home_team;
    home_team:home_team;
  }

  export interface home_team {
    id	:	number
    abbreviation	:string;
    city	:string;
    conference	:string;
    division	:string;
    full_name	:string;
    name	:string;
  }
