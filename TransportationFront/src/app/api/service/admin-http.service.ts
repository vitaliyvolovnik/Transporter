import {Injectable} from "@angular/core";
import {API_URL} from "@config/Constans";
import {HttpClient} from "@angular/common/http";


@Injectable({providedIn:'root'})
export class AdminHttpService{
  private readonly ADMIN_URL = `${API_URL}/admin`;

  constructor(private httpClient:HttpClient) {
  }

  blockUser(id:number){
    return this.httpClient.get(`${this.ADMIN_URL}/${id}/false`);
  }

  unblockUser(id:number){
    return this.httpClient.get(`${this.ADMIN_URL}/${id}/true`);
  }

}
