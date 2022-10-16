import {SecurityUser} from "@api/models/SecurityUser";
import {Offer} from "@api/models/Offer";

export interface Transporter{
  id:number;
  companyName:string;
  phoneNumber:string;
  user:SecurityUser;
  offers:Offer[];


}
