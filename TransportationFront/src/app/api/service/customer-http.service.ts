import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_URL} from "@config/Constans";
import {Observable} from "rxjs";
import {Customer} from "@api/models/Customer";
import {Pagination} from "@api/models/Pagination";
import {RestPage} from "@api/models/RestPage";

@Injectable({providedIn:'root'})
export class CustomerHttpService{
  private readonly URL = `${API_URL}/customer`;

  constructor(private httpClient:HttpClient) {
  }

  getAll(pagination:Pagination):Observable<RestPage<Customer>>{
    const params = new HttpParams({fromObject:{...pagination}});
    return this.httpClient.get<RestPage<Customer>>(this.URL,{params});
  }
  getCurrent(){
    return this.httpClient.get<Customer>(`${this.URL}/current`);
  }



  delete(id:number){
    return this.httpClient.delete(`${this.URL}/${id}`);
  }


}
