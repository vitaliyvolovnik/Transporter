import {DeliveryState} from "@api/models/enums/DeliveryState";
import {Address} from "@api/models/Address";
import {Cargo} from "@api/models/Cargo";
import {Offer} from "@api/models/Offer";

export interface Delivery {
  id: number;

  description: string;
  state: DeliveryState;

  creatingTime: string;
  departureDate: string;
  arrivalDate: string;

  destinationAddress: Address;
  departureAddress: Address;
  cargoes: Cargo[];
  offer: Offer[];

}
