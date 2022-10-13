import {Injectable} from "@angular/core";
import {API_URL} from "@config/Constans";
import {HttpClient} from "@angular/common/http";
import {Offer} from "@api/models/Offer";



@Injectable({providedIn:'root'})
export class OfferHttpService{
  private readonly URL =`${API_URL}/offer`;
  private readonly DELIVERY_URL =`${API_URL}/delivery`;

  constructor(private httpClient:HttpClient) {
  }

  getAll(){
    return this.httpClient.get<Offer[]>(this.URL)
  }
  get(id:number){
    return this.httpClient.get<Offer>(`${this.URL}/${id}`);
  }
  create(offer:Offer){
    return this.httpClient.post(this.URL,offer);
  }

  getCurrentTransporterOffer() {
    return this.httpClient.get<Offer[]>(`${this.URL}/currentOffer`);
  }
  delete(id:number){
    return this.httpClient.delete(`${this.URL}/${id}`);
  }

  update(offer: Offer) {
    return this.httpClient.put(`${this.URL}/${offer.id}`,offer);
  }
  getDeliveryOffer(deliveryId:number){
    return this.httpClient.get<Offer[]>(`${this.URL}/delivery/${deliveryId}`);
  }
}
