import {Injectable} from "@angular/core";
import {API_URL} from "@config/Constans";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Pagination} from "@api/models/Pagination";
import {Observable} from "rxjs";
import {RestPage} from "@api/models/RestPage";
import {Customer} from "@api/models/Customer";
import {Transporter} from "@api/models/Transporter";


@Injectable({providedIn:'root'})
export class TransporterHttpService{
  private readonly URL = `${API_URL}/transporter`;

  constructor(private httpClient:HttpClient) {
  }

  getAll(pagination:Pagination):Observable<RestPage<Transporter>>{
    const params = new HttpParams({fromObject:{...pagination}});
    return this.httpClient.get<RestPage<Transporter>>(this.URL,{params});
  }
  getCurrent(){
    return this.httpClient.get<Transporter>(`${this.URL}/current`);
  }



  delete(id:number){
    return this.httpClient.delete(`${this.URL}/${id}`);
  }

}
