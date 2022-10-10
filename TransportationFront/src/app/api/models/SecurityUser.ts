import {Role} from "@api/models/enums/Role";

export interface SecurityUser{
  id:number;
  email:string;
  role:Role;
  active:boolean;
}
