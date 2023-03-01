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
    results:Array<any>
  
  }