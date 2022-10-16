import {Delivery} from "@api/models/Delivery";
import {Transporter} from "@api/models/Transporter";
import {OfferState} from "@api/models/enums/OfferState";

export interface Offer{
  id:number;
  information:string;
  price:number;

  delivery:Delivery;
  transporter:Transporter;
  state:OfferState;
}
