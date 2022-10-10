import {SecurityUser} from "@api/models/SecurityUser";


export interface Customer{
  id:number;
  firstname:string;
  lastname:number;
  number:string;
  user:SecurityUser;
}
