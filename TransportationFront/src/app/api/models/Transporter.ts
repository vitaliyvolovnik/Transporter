import {SecurityUser} from "@api/models/SecurityUser";
import {Offer} from "@api/models/Offer";

export interface Transporter{
  companyName:string;
  phoneNumber:string;
  user:SecurityUser;
  offers:Offer[];


}
