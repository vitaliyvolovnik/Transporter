import {Delivery} from "@api/models/Delivery";
import {Transporter} from "@api/models/Transporter";

export interface Offer{
  id:number;
  information:string;
  price:number;

  delivery:Delivery;
  transporter:Transporter;
}
